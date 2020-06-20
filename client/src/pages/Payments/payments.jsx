import React, {useEffect} from 'react';
import { Content } from "../../styles";
import { Container, Card, CardContent, CardHeader, Grid, TextField,  InputAdornment, Button, Divider,
     TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Tooltip, IconButton,
     Typography } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { ptBR } from "date-fns/locale";
import NumberFormat from 'react-number-format'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import { Formik } from 'formik';
import * as yup from 'yup'
import {FiX} from 'react-icons/fi';
import Service from '../../services/service';
import { useSnackbar } from 'notistack';
import ConfirmationDialog from '../../components/Dialogs/confirmation';

function Payments (props) {
    const client = props.location.client;
   
    const { enqueueSnackbar } = useSnackbar();
    const showSnackbar = (message, variant) => {
        enqueueSnackbar(message, {variant});
    }

    const initialState = {
        date: new Date(),
        amount: '',
        clientId: client?._id
    };

    // eslint-disable-next-line
    const [payment, setPayment] = React.useState(initialState);

    const [paymentList, setPaymentList] = React.useState([]);
    const [selectedPayment, setSelectedPayment] = React.useState([]);

    const getPayments = () => {
        Service.getPayments(client?._id).then(response => {
            setPaymentList(response.data);
        });
    };
    
    useEffect(() => {
        getPayments();
        // eslint-disable-next-line
    }, [])   

    function NumberFormatCustom(props) {
        const { inputRef, onChange, ...other } = props;  
        return (
          <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
              onChange({
                target: {
                  name: props.name,
                  value: values.value,
                },
              });
            }}
            isNumericString
            thousandSeparator='.'
            decimalSeparator=','
            decimalScale={2}
            fixedDecimalScale
            placeholder="0,00"
          />
        );
    };

    const validations = yup.object().shape({
        date: yup.date('Insira uma data válida').required('Selecione a data'),
        amount: yup.number().min(0, 'Insira um valor').required('Insira um valor')
    }); 

    function addPayment(values, {setSubmitting}) {
        const totalPayment = paymentList.reduce((accumulator, current) => +accumulator + +current.amount, 0);
        if (+client.totalAmount - (+totalPayment + +values.amount) < 0)
            showSnackbar('Pagamento maior que o valor total!', 'warning');

        Service.addPayment(values).then(response => {
            setSubmitting(false);
            setPayment(initialState);
            getPayments();
            showSnackbar('Adicionado com sucesso', 'success');
        });
    }

    const [open, setOpen] = React.useState(false);
    function openDeleteConfirmation(item) {
        setOpen(true);
        setSelectedPayment(item);
    }
    function closeDeleteConfirmation(option) {
        setOpen(false);
        if (option)
            deletePayment();
        else
            setSelectedPayment({});
    }

    function deletePayment() {
        if (!!selectedPayment)
            Service.deletePayment(selectedPayment._id)
                .then(res => {
                    if (!res.data.errors) {
                        showSnackbar('Pagamento removido', 'info');
                        getPayments();
                    }                      
                });
    }

    return (
        <Container maxWidth="lg">
            <Content>
                <Card>                      
                    <CardHeader
                        title = {"Pagamentos de "+client?.name}
                    />    
                    <Divider variant="middle"/>
                    <CardContent> 
                        <Formik enableReinitialize={true}
                            initialValues={payment} 
                            onSubmit={(values, {setSubmitting}) => addPayment(values, {setSubmitting})} 
                            validationSchema={validations}
                            >              
                            {({ values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit, setFieldValue, setSubmitting }) => {
                                
                                return (
                                    <form onSubmit={handleSubmit}>
                                        
                                        <Grid container direction="row" justify="space-evenly" alignItems="center">
                                            <Grid item lg className="item">
                                                <MuiPickersUtilsProvider locale={ptBR} utils={DateFnsUtils}>
                                                    <KeyboardDatePicker
                                                         size="small"
                                                        inputVariant="outlined"
                                                        id="date"
                                                        label="Data de pagamento"
                                                        format="dd/MM/yyyy"
                                                        name="date"
                                                        value={values.date || new Date()}
                                                        onChange={date => date && setFieldValue('date', date, false)}
                                                        onBlur={handleBlur}
                                                        helperText={(errors.date && touched.date) && errors.date}
                                                        error={errors.date && touched.date}
                                                        KeyboardButtonProps={{
                                                            'aria-label': 'change date',
                                                        }}
                                                    />
                                                </MuiPickersUtilsProvider>
                                            </Grid>
                                            <Grid item lg className="item">
                                                <TextField
                                                     size="small"
                                                     fullWidth
                                                    type="text"
                                                    label="Valor Total"
                                                    id="amount"
                                                    name="amount"
                                                    value={values.amount || ''}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    InputProps={{
                                                        startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                                                        inputComponent: NumberFormatCustom,
                                                    }}
                                                    variant="outlined" 
                                                    helperText={(errors.amount && touched.amount) && errors.amount}
                                                    error={errors.amount && touched.amount}
                                                    />
                                            </Grid>

                                            <Grid item>
                                                <Button type="submit" disabled={isSubmitting}
                                                    variant="contained"  size="small" style={{color: '#fff', backgroundColor: 'green'}} >
                                                    Adicionar
                                                </Button>
                                            </Grid>
                                        </Grid>

                                    </form> 
                                );
                            }}
                            </Formik>
                            <Divider variant="middle" style={{marginTop: 16, marginBottom: 16}}/>
                            {
                                !paymentList.length ? 
                                    <Typography variant="body2" color="textSecondary" component="p" align="center">
                                        nenhum pagamento registrado
                                    </Typography>
                                :
                                (   <>
                                    <Grid container direction="row" justify="space-around">
                                        <Typography variant="body2" color="textPrimary" component="p" align="center">
                                        { Number(paymentList.reduce((accumulator, current) => +accumulator + +current.amount, 0)).toLocaleString('pt-BR',  { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' }) } 
                                        </Typography>
                                        <Typography variant="body2" color="textPrimary" component="p" align="center">
                                        { paymentList.length }  {paymentList.length === 1 ? ' pagamento' : ' pagamentos' } 
                                        </Typography>
                                    </Grid>
                                    <Divider variant="middle" style={{marginTop: 16, marginBottom: 16}}/>
                                    <TableContainer component={Paper}  style={{boxShadow:'0 2px 4px -2px rgba(0,0,0,0.24), 0 4px 24px -2px rgba(0, 0, 0, 0.2)'}}>
                                        <Table aria-label="simple table">
                                        <TableHead style={{backgroundColor: '#e9e9e9'}}>
                                            <TableRow>
                                                <TableCell><b>Valor</b></TableCell>
                                                <TableCell ><b>Data</b></TableCell>
                                                <TableCell align="right"></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {paymentList.map((row) => (
                                                <TableRow key={row._id} hover={true}>
                                                    <TableCell component="th" scope="row">
                                                        {Number(row.amount).toLocaleString('pt-BR',  { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' })}
                                                    </TableCell>
                                                    <TableCell >{new Date(row.date).toLocaleDateString()}</TableCell>
                                                    <TableCell align="right">
                                                        <IconButton onClick={()=>openDeleteConfirmation(row)} >
                                                            <Tooltip title="Excluir Pagamento" arrow>
                                                                <span>
                                                                <FiX size={20} style={{color:'red'}}/>
                                                                </span>
                                                            </Tooltip>
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                        </Table>

                                    </TableContainer>
                                    </>
                                )
                            }
                    </CardContent>
                </Card>               
            </Content>

            <ConfirmationDialog
                title={() => "Excluir"}
                content={() => "Deseja realmente excluir?"}
                footer={() => (
                <>
                    <Button onClick={() => closeDeleteConfirmation(false)}> Não </Button>
                    <Button onClick={() => closeDeleteConfirmation(true)} color="primary"> Sim </Button>
                </>
                )}
                open={open}
            />
        </Container>     
    );

}

export default Payments;
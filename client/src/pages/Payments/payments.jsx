import React, {useEffect} from 'react';
import { Content } from "../../styles";
import { Container, Card, CardContent, CardHeader, Grid, TextField,  InputAdornment, Button, Divider,
     TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { ptBR } from "date-fns/locale";
import NumberFormat from 'react-number-format'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import { Formik } from 'formik';
import * as yup from 'yup'
import {FiX} from 'react-icons/fi';
import Service from '../../services/service';

function Payments (props) {
    const client = props.location.client;
    if (!client)
        props.history.push('/');

        
    // eslint-disable-next-line
    const [payment, setPayment] = React.useState({
        date: new Date(),
        amount: '',
        clientId: client?._id,
        success: false
    });

    const [paymentList, setPaymentList] = React.useState([]);

    const getClients = () => {
        Service.getPayments(client?._id).then(response => {
            setPaymentList(response.data);
        });
    };

    useEffect(() => {
        getClients();
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
        Service.addPayment(values).then(response => {
            setSubmitting(false);
            getClients();
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
                        <Formik 
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
                                                <Button type="submit" disabled={isSubmitting || (props.data && props.data.disabled)}
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

                            <TableContainer component={Paper}>
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
                                        <TableRow key={row.date} hover={true}>
                                            <TableCell component="th" scope="row">
                                                {Number(row.amount).toLocaleString('pt-BR',  { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' })}
                                            </TableCell>
                                            <TableCell >{row.date}</TableCell>
                                            <TableCell align="right"><FiX/></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                                </Table>

                            </TableContainer>

                            {/* <List>
                            {[{date: '17/06/2020', amount: '100'}].map((text, index) => (
                                <ListItem button key={text}>
                                    <Grid container direction="row" justify="space-between">
                                        <Grid item>
                                            <Typography variant="body2" style={{color: '#009900'}} component="p">
                                                {Number(text.amount).toLocaleString('pt-BR',  { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' })}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="body2" component="p">
                                                {text.date}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <FiX/>
                                        </Grid>
                                    </Grid>
                                
                                </ListItem>
                            ))}
                            </List> */}
                    </CardContent>
                </Card>               
            </Content>

        </Container>     
    );

}

export default Payments;
import  React, { useState, useEffect } from 'react';
import {  Grid, TextField,  InputAdornment, Button, Tooltip } from '@material-ui/core'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';
import { ptBR } from "date-fns/locale";
import { Formik } from 'formik';
import * as yup from 'yup'
import NumberFormat from 'react-number-format'
import './styles.css';
import { FiPhoneForwarded } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
// import { RiMailSendLine } from 'react-icons/ri';
// import { AiOutlineFileSearch } from 'react-icons/ai';

function Form(props) {

    const [client, setClient] = useState({});
    
    useEffect(()=> {
        setClient(props.initialValues);
        // eslint-disable-next-line
    }, []);

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

    function countTextRows(value) {
        var count = 1;
        if (!!value)
            count = value.split("\n").length;
        return count > 1 ? count : 2;
    };  

    const validations = yup.object().shape({
        name: yup.string().required('Preencha o nome'),
        email: yup.string().email('Email não é válido'),
        totalAmount: yup.number().min(0, 'Insira um valor').required('Insira um valor')
    });   

    function cancelForm() {
        setClient({});
    } 

    // function viewEmail() {
    //     return;
    // } 

    return (
        <Formik enableReinitialize={true}
            initialValues={client} 
            onSubmit={(values) => props.saveClient(values)} 
            validationSchema={validations}
            >              
            {({ values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit, setFieldValue }) => {
                
                return (
                    <form onSubmit={handleSubmit}>
                        <Grid container direction="column" justify="space-between" alignItems="stretch">
                            <Grid item lg className="item">
                                <TextField 
                                    id="txtName" 
                                    label="Nome" 
                                    name="name"
                                    variant="outlined" 
                                    fullWidth
                                    value={values.name || ''}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={(errors.name && touched.name) && errors.name}
                                    error={errors.name && touched.name}
                                    disabled={values.disabled}/>
                            </Grid>
                            <Grid container direction="row" justify="center" alignItems="center">
                                <Grid item xs className="item">
                                    <TextField 
                                        id="txtPhone" 
                                        label="Telefone" 
                                        name="phone"
                                        variant="outlined" 
                                        fullWidth
                                        value={values.phone || ''}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        helperText={(errors.phone && touched.phone) && errors.phone}
                                        error={errors.phone && touched.phone}
                                        disabled={values.disabled}/>
                                </Grid>                                
                                { !!values.phone && !!client._id && 
                                    <>
                                    <Grid item xs={1} className="item" style={{paddingLeft: '0'}}>  
                                        <Tooltip title="Ligar" arrow>   
                                            <a href={'tel:'+values.phone}>                                        
                                            <FiPhoneForwarded size={20}/>
                                            </a>
                                        </Tooltip>
                                    </Grid>
                                    <Grid item xs={1} className="item" style={{paddingLeft: '0'}}> 
                                        <Tooltip title="Abrir WhatsApp" arrow>   
                                            <a href={'https://api.whatsapp.com/send?phone=55'+values.phone} target="_blank" rel="noopener noreferrer">
                                            <FaWhatsapp className="whatsapp"/>
                                            </a>
                                        </Tooltip>
                                    </Grid>
                                    </>
                                }
                            </Grid>
                            
                            <Grid item lg className="item">
                                <TextField 
                                    fullWidth 
                                    id="txtEmail" 
                                    label="Email" 
                                    variant="outlined" 
                                    name="email"
                                    value={values.email  || ''}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    disabled={values.disabled}
                                    helperText={(errors.email && touched.email) && errors.email}
                                    error={errors.email && touched.email}/>   
                            </Grid>

                            <Grid item lg className="item" style={{marginTop: 20}}>
                                <MuiPickersUtilsProvider locale={ptBR} utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        fullWidth
                                        inputVariant="outlined"
                                        id="date"
                                        label="Data de início"
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
                                        disabled={values.disabled}
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>
                            
                            <Grid item lg className="item">
                                <TextField 
                                    fullWidth 
                                    id="txtLocation" 
                                    label="Localização" 
                                    variant="outlined" 
                                    name="location"
                                    value={values.location  || ''}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    disabled={values.disabled}/>   
                            </Grid>

                            <Grid item lg className="item">
                                <TextField
                                    fullWidth
                                    type="text"
                                    label="Valor Total"
                                    id="txtAmount"
                                    name="totalAmount"
                                    value={values.totalAmount || ''}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                                        inputComponent: NumberFormatCustom,
                                    }}
                                    variant="outlined" 
                                    helperText={(errors.totalAmount && touched.totalAmount) && errors.totalAmount}
                                    error={errors.totalAmount && touched.totalAmount}
                                    disabled={values.disabled}/>
                            </Grid>
                        </Grid>
                        <Grid container direction="row" justify="center" alignItems="center">
                            <Grid item xs className="item">             
                                    <TextField
                                        fullWidth
                                        multiline
                                        rows={countTextRows(values.description)}
                                        type="text"
                                        label="Descrição"
                                        id="txtDescription"
                                        name="description"
                                        value={values.description || ''}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        variant="outlined"
                                        disabled={values.disabled} />
                            </Grid>
                            {/* { !!values.description && !!client._id && 
                            <Grid item xs={1} className="item" > 
                                <Grid container  direction="column" justify="space-between">
                                    <Grid item xs className="item" style={{paddingLeft: '0'}}>  
                                       <AiOutlineFileSearch onClick={viewEmail}/> 
                                    </Grid>
                                    <Grid item xs  className="item" style={{paddingLeft: '0'}}>  
                                       <RiMailSendLine onClick={(values) => props.sendEmail(values)}/>
                                    </Grid>
                            
                                </Grid>
                            </Grid>
                            } */}
                        </Grid>

                        <Grid container direction="row" justify="space-between" className="action">
                            <Button variant="outlined" onClick={cancelForm}>
                                Limpar
                            </Button>
                            <Button variant="contained" color="primary" type="submit" disabled={isSubmitting || (props.data && props.data.disabled)}>
                                Salvar
                            </Button>
                        </Grid>
                    </form> 
                );
            }}
            </Formik>
    );

};

export default Form;

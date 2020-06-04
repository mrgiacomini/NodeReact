import React from 'react';
import {  Grid, TextField,  InputAdornment, Button } from '@material-ui/core'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';
import { ptBR } from "date-fns/locale";
import { Formik } from 'formik';
import * as yup from 'yup'
import NumberFormat from 'react-number-format'

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
}

class Form extends React.Component {

    countTextRows = (value) => {
        var count = 1;
        if (!!value)
            count = value.split("\n").length;
        return count > 1 ? count : 2;
    };  

    render() {  
        
        const validations = yup.object().shape({
            name: yup.string().required('Preencha o nome'),
            totalAmount: yup.number().min(0, 'Insira um valor').required('Insira um valor')
        });        
    
        const styles  = {
            item: {
                textAlign: 'center',
                padding: '8px',
            },
            header: {
              textAlign: 'center',
              spacing: 10,
            },
            action: {
              padding: '8px'
            },
        };

        return (
        <Formik initialValues={this.props.data} onSubmit={(values, {setSubmitting}) => this.props.saveClient(values, {setSubmitting})} validationSchema={validations}>              
        {(props) => {
            const { values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit, handleReset, } = props;
            return (
                <form onSubmit={handleSubmit}>
                    <Grid container direction="column" justify="space-between" alignItems="stretch">
                        <Grid item lg style={styles.item}>
                            <TextField 
                                id="txtName" 
                                label="Nome" 
                                name="name"
                                variant="outlined" 
                                fullWidth
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                helperText={(errors.name && touched.name) && errors.name}
                                error={errors.name && touched.name}/>
                        </Grid>

                        <Grid item lg style={styles.item}>
                            <MuiPickersUtilsProvider locale={ptBR} utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    fullWidth
                                    inputVariant="outlined"
                                    id="date"
                                    label="Data de início"
                                    format="dd/MM/yyyy"
                                    name="date"
                                    value={values.date}
                                    onChange={date => date && props.setFieldValue('date', date, false)}
                                    onBlur={handleBlur}
                                    helperText={(errors.date && touched.date) && errors.date}
                                    error={errors.date && touched.date}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        
                        <Grid item lg style={styles.item}>
                            <TextField 
                                fullWidth 
                                id="txtLocation" 
                                label="Localização" 
                                variant="outlined" 
                                name="location"
                                value={values.location}
                                onChange={handleChange}
                                onBlur={handleBlur}/>   
                        </Grid>

                        <Grid item lg style={styles.item}>
                            <TextField
                                fullWidth
                                type="text"
                                label="Valor Total"
                                id="txtAmount"
                                name="totalAmount"
                                value={values.totalAmount}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                                    inputComponent: NumberFormatCustom,
                                }}
                                variant="outlined" 
                                helperText={(errors.totalAmount && touched.totalAmount) && errors.totalAmount}
                                error={errors.totalAmount && touched.totalAmount}/>
                        </Grid>
                    </Grid>
                    <Grid item lg style={styles.item}>             
                            <TextField
                                fullWidth
                                multiline
                                rows={this.countTextRows(values.description)}
                                type="text"
                                label="Descrição"
                                id="txtDescription"
                                name="description"
                                value={values.description}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                variant="outlined" />
                    </Grid>
                    <Grid container direction="row" justify="space-between" style={styles.action}>
                        <Button variant="contained" color="primary" type="submit" disabled={isSubmitting}>
                            Salvar
                        </Button>
                        <Button variant="outlined" onClick={handleReset} disabled={!this.props.data}>
                            Limpar
                        </Button>
                    </Grid>
                </form> 
            );
        }}
        </Formik>

        )};
};

export default Form;

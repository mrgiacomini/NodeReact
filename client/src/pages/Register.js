import React, { Component } from 'react'
import { Content } from "../styles";
import { Container, Grid, TextField, Card, CardContent, CardHeader,  
    InputAdornment, Button, Divider } from '@material-ui/core'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';
import { ptBR } from "date-fns/locale";
import Service from '../services/service';
import { Formik } from 'formik';
import * as yup from 'yup'

class Register extends Component {
    constructor(props){
        super(props);
        if (props.location.state) {
            this.state = props.location.state;
        }
        else
            this.state ={
                name: '',
                date: new Date(),
                location: '',
                totalAmount: ''
            }
        this.saveClient = this.saveClient.bind(this);
    }
    
    saveClient = (values, {setSubmitting}) => {
        Service.addClient(values)
            .then(res => {
                if (!res.data.errors)
                    console.log('Cliente salvo com sucesso.');
                else 
                    console.log(res.message);
                setSubmitting(false);
            });
    }
    
    render() {
        const validations = yup.object().shape({
            name: yup.string().required('Preencha o nome'),
            totalAmount: yup.number().moreThan(0).required('Insira um valor')
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
            <Container maxWidth="lg">
                <Content>
                    <Card> 
                        <CardHeader title="Cadastro" style={styles.header}/>
                        <Divider variant="middle"/>
                        <CardContent>
                            <Formik initialValues={this.state} onSubmit={(values, {setSubmitting}) => this.saveClient(values, {setSubmitting})} validationSchema={validations}>              
                            {(props) => {
                                const { values, touched, errors, dirty, isSubmitting, handleChange, handleBlur, handleSubmit, handleReset, } = props;
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
                                                    type="number"
                                                    label="Valor Total"
                                                    id="txtAmount"
                                                    name="totalAmount"
                                                    value={values.totalAmount}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    InputProps={{
                                                        startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                                                    }}
                                                    variant="outlined" 
                                                    helperText={(errors.name && touched.name) && errors.name}
                                                    error={errors.name && touched.name}/>
                                            </Grid>
                                        </Grid>
                                        <Grid container direction="row" justify="space-between" style={styles.action}>
                                            <Button variant="contained" color="primary" type="submit" disabled={isSubmitting}>
                                                Salvar
                                            </Button>
                                            <Button variant="outlined" onClick={handleReset} disabled={!this.state}>
                                                Limpar
                                            </Button>
                                        </Grid>
                                    </form> 
                                );
                            }}
                            </Formik>
                        </CardContent>
                    </Card>
                </Content>
            </Container>              
        )
    }
}

export default Register

import React, { Component } from 'react'
import { Content } from "../styles";
import { Container, Grid, TextField, Card, CardContent, CardHeader, CardActions, 
    InputAdornment, Button, Divider } from '@material-ui/core'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';
import { ptBR } from "date-fns/locale";

class Register extends Component {
    render() {
        var selectedDate= new Date();
    
        const handleDateChange = (date) => {
            selectedDate = date;
        };

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
              display: 'flex',
              justifyContent: 'space-around',
            },
        };

        return (            
            <Container maxWidth="lg">
                <Content>
                    <Card> 
                        <CardHeader title="Cadastro" style={styles.header}/>
                        <Divider variant="middle"/>
                        <CardContent>              
                            <form noValidate autoComplete="off">
                                <Grid container direction="column" justify="space-between" alignItems="stretch">
                                    <Grid item lg style={styles.item}>
                                        <TextField id="txtName" label="Nome" variant="outlined" fullWidth/>
                                    </Grid>

                                    <Grid item lg style={styles.item}>
                                        <MuiPickersUtilsProvider locale={ptBR} utils={DateFnsUtils}>
                                            <KeyboardDatePicker
                                                fullWidth
                                                inputVariant="outlined"
                                                id="dateInitial"
                                                label="Data de início"
                                                format="dd/MM/yyyy"
                                                value={selectedDate}
                                                onChange={handleDateChange}
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
                                            variant="outlined" />   
                                    </Grid>

                                    <Grid item lg style={styles.item}>
                                        <TextField
                                            fullWidth
                                            label="Valor Total"
                                            id="txtAmount"
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                                            }}
                                            variant="outlined" />
                                    </Grid>
                                </Grid>
                            </form> 
                        </CardContent>
                        <Divider variant="middle"/>
                        <CardActions style={styles.action}>
                            <Button variant="contained" color="primary" >Salvar</Button>
                        </CardActions>
                    </Card>
                </Content>
            </Container>              
        )
    }
}

export default Register

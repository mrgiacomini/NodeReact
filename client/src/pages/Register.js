import React, { Component } from 'react'
import { Content } from "../styles";
import { Container, Grid, TextField, Card, CardContent, CardHeader, CardActions, FormControl, 
    InputLabel, OutlinedInput, InputAdornment, Button } from '@material-ui/core'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';

class Register extends Component {
    render() {
        var selectedDate= new Date();
    
        const handleDateChange = (date) => {
            selectedDate = date;
        };
        
        return (            
            <Container maxWidth="lg">
                <Content>
                <Card  variant="outlined"> 
                    <CardHeader title="Cadastro"/>
                    <CardContent>              
                        <form noValidate autoComplete="off">
                            <Grid container direction="row" justify="space-between" alignItems="center">
                                <Grid item lg style={{textAlign: "center"}}>
                                    <TextField id="txtName" label="Nome" variant="outlined" />
                                </Grid>
                                <Grid item lg style={{textAlign: "center"}}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            margin="normal"
                                            id="dateInitial"
                                            label="Data de início"
                                            format="MM/dd/yyyy"
                                            value={selectedDate}
                                            onChange={handleDateChange}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
                                </Grid>
                                <Grid item lg style={{textAlign: "center"}}>
                                    <TextField text="number" id="txtEstimatedTime" label="Duração estimada" variant="outlined" />   
                                </Grid>
                                <Grid item lg style={{textAlign: "center"}}>
                                    <TextField id="txtLocation" label="Localização" variant="outlined" />   
                                </Grid>
                                <Grid item lg style={{textAlign: "center"}}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel htmlFor="txtAmount">Valor Total</InputLabel>
                                        <OutlinedInput
                                            id="txtAmount"
                                            value={0}
                                            onChange={()=> {}}
                                            startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                                            labelWidth={60}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </form> 
                    </CardContent>
                    <CardActions>
                        <Button>Salvar</Button>
                    </CardActions>
                </Card>
                </Content> 
            </Container>              
        )
    }
}

export default Register

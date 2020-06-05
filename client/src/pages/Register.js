import React, { Component } from 'react'
import { Content } from "../styles";
import { Container, Card, CardContent, CardHeader,  Divider } from '@material-ui/core';
import Service from '../services/service';
import Form from '../components/form'

class Register extends Component {
    constructor(props){
        super(props);
        if (props.location.state) {
            this.state = props.location.state;
            this.state.disabled = true;
        }
        else
            this.state ={
                name: '',
                date: new Date(),
                location: '',
                totalAmount: '',
                description: ''
            }
        this.saveClient = this.saveClient.bind(this);
    }
    
    saveClient = (values, {setSubmitting}) => {
        Service.addClient(values)
            .then(res => {
                if (!res.data.errors) {
                    console.log('Cliente salvo com sucesso.');
                    this.props.history.push('/');
                } else 
                    console.log(res.message);
                setSubmitting(false);
            });
    }
    
    render() {
        return (            
            <Container maxWidth="lg">
                <Content>
                    <Card> 
                        <CardHeader title="Cadastro" style={{ textAlign: 'center', spacing: 10 }}/>
                        <Divider variant="middle"/>
                        <CardContent>
                            <Form data={this.state} saveClient={this.saveClient}></Form>
                        </CardContent>
                    </Card>
                </Content>
            </Container>              
        )
    }
}

export default Register;

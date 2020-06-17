import React from 'react';
import { Content } from "../../styles";
import { Container, Card, CardContent, CardActionArea } from '@material-ui/core';
import { Link } from 'react-router-dom';

function Client (props) {     
    const client = props.location.client;   
    if (!client)
        props.history.push('/');


    return (
        <Container maxWidth="lg">
            <Content>
                <Card>      
                    <CardActionArea 
                        component={Link} 
                        to={{ 
                            pathname: '/cadastro',
                            initialValues: client
                        }} >            
                        <CardContent>                            
                            Editar
                        </CardContent>
                    </CardActionArea>
                </Card>
                <Card>                     
                    <CardActionArea 
                        component={Link} 
                        to={{ 
                            pathname: '/pagamentos',
                            client: client
                        }} >                                 
                        <CardContent>                            
                            Pagamentos
                        </CardContent>
                    </CardActionArea>
                </Card>
               
            </Content>

        </Container>     
    );

}

export default Client;
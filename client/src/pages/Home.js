import React, { Component } from 'react';
import { Content } from "../styles";
import { Container, Button, Card, CardContent, CardActionArea,  
	Grid, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Service from '../services/service';
import { getCookie } from '../helpers/auth';
import Skeleton from '@material-ui/lab/Skeleton';

class Home extends Component {
    state = {
      clientList: [],
      didGetClients: false
    };

    componentDidMount() {
      const token = getCookie('token');
      if (token !== 'undefined')     
        Service.getClients(token).then(response => {
          this.setState({clientList: response.data, didGetClients: true });
        });
    }

    componentDidUpdate(nextProps) { 
      if (nextProps.location.pathname === '')
        this.componentDidMount();
    }

    render() {
      return (
        <Container maxWidth="lg">
            <Content>               
            <Button component={Link} to={'/cadastro'} variant="contained" color="primary">Novo</Button>
            <Content/>            
            { !this.state.didGetClients && !this.state.clientList.length ?
              (<>
                <Card style={{marginBottom:10}}>
                  <Skeleton variant="rect" width="100%" height={100} animation="pulse"/>
                </Card> 
                <Card style={{marginBottom:10}}>
                  <Skeleton variant="rect" width="100%" height={100} animation="pulse"/>
                </Card>
                <Card style={{marginBottom:10}}>
                  <Skeleton variant="rect" width="100%" height={100} animation="pulse"/>
                </Card>
                <Card style={{marginBottom:10}}>
                  <Skeleton variant="rect" width="100%" height={100} animation="pulse"/>
                </Card>
                </>
              )
              : 
              ( this.state.didGetClients && !this.state.clientList.length ?
                (
                  <Typography variant="body2" color="textSecondary" component="p" align="center">
                      nenhum cliente cadastrado
                  </Typography>
                ) :
                (
                this.state.clientList.map((client, indice) => (
                <Card key={client._id} style={{marginBottom:10}}>
                    <CardActionArea 
                    component={Link} 
                    to={{ 
                        pathname: '/cadastro',
                        initialValues: client
                    }} >
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                            {client.name}
                            </Typography>
                        <Grid container direction="row" justify="space-between">
                            <Typography variant="body2" color="textSecondary" component="p">
                            {Number(client.totalAmount).toLocaleString('pt-BR',  { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' })}
                            </Typography>
                            <Typography variant="body2" style={{color: '#999966'}} component="p">
                            restante
                            </Typography> 
                            <Grid container direction="row" justify="space-between">
                              <Typography variant="body2" style={{color: '#009900'}} component="p">
                              R$ 0.00
                              </Typography>
                              <Typography variant="body2" style={{color: '#999966'}} component="p">
                              R$ 0.00
                              </Typography>
                            </Grid>
                        </Grid>
                        </CardContent>
                    </CardActionArea>
                </Card>
                )	
              ) 
            ))}
            </Content>
        </Container>
        );
    }  
    };

export default Home;
import React, { Component } from 'react';
import { Content } from "../styles";
import { Container, Button, Card, CardContent, Grid, Typography, Badge, Tooltip } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Service from '../services/service';
import { getCookie } from '../helpers/auth';
import Skeleton from '@material-ui/lab/Skeleton';
import {FaCashRegister} from 'react-icons/fa';

class Home extends Component {
    state = {
      clientList: [],
      didGetClients: false
    };

    componentDidMount() {
      var token = getCookie('token');
      if (token === undefined)
        setTimeout(() => {token = getCookie('token');}, 500);
          
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
                        <CardContent>
                          <Grid container direction="row" >
                            <Grid item xs={10} component={Link} 
                              to={{ 
                                  pathname: '/cadastro',
                                  initialValues: client
                              }} style={{ textDecoration: 'none', color: 'inherit' }}
                              >

                              <Typography gutterBottom variant="h5" component="h2">
                              {client.name}
                              </Typography>
                              <Grid container direction="row" justify="space-between">
                                  <Typography variant="body2" color="textPrimary" component="p">
                                  {Number(client.totalAmount).toLocaleString('pt-BR',  { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' })}
                                  </Typography>
                                  <Typography variant="body2" style={{color: '#999966'}} component="p">
                                  restante
                                  </Typography> 
                                  <Grid container direction="row" justify="space-between">
                                    <Typography variant="body2" style={{color: '#009900'}} component="p">
                                      {/* total dos pagamentos */}
                                      {Number(client.totalPayments).toLocaleString('pt-BR',  { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' })}
                                    </Typography>
                                    <Typography variant="body2" style={{color: (+client.totalAmount - +client.totalPayments) < 0 ? 'red' : '#999966'}} component="p">
                                      {/* restante */}                                      
                                      { 
                                        Number(+client.totalAmount - +client.totalPayments).toLocaleString('pt-BR',  { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' })
                                      }
                                    </Typography>
                                  </Grid>
                              </Grid>                              
                            </Grid>
                            <Grid item xs={2} >
                              <Grid container direction="column" justify="space-between" alignItems="flex-end" >
                                <Grid item> 
                                  <Badge
                                    badgeContent={client.quantityPayments}
                                    color="primary"
                                    showZero
                                    anchorOrigin={{
                                      vertical: 'bottom',
                                      horizontal: 'left',
                                    }}
                                  >
                                    <Link  
                                      to={{ 
                                          pathname: '/pagamentos',
                                          client: client
                                      }}
                                    >  
                                      <Tooltip title="Pagamentos" arrow> 
                                        <span>                               
                                        <FaCashRegister size={25} style={{ textDecoration: 'none', color: 'black' }}/>
                                        </span>
                                      </Tooltip>  
                                    </Link> 
                                  </Badge>
                                </Grid>                    
                              </Grid>
                            </Grid>
                          </Grid>
                        </CardContent>
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
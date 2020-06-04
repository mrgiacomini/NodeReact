import React, { Component } from 'react';
import { Content } from "../styles";
import { Container, Button, List, ListItem, ListItemText, Card, CardContent, CardActionArea, Divider, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Service from '../services/service';

class Home extends Component {
    state = {
      clientList: [],
      didGetClientes: false
    };

    componentDidMount() {
      Service.getClients().then(response => {
        this.setState({clientList: response.data, didGetClientes: true });
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
            {/* <Card> 
              <CardContent>
                <List> 
                {this.state.clientList.map((client, indice) => (                 
                    <div key={client._id}> 
                      { indice > 0 && <Divider variant="middle" />}
                      <ListItem  
                      button 
                      component={Link} 
                      to={{ 
                        pathname: '/cadastro',
                        state: client
                      }} 
                      style={{borderRadius: 4}}>
                        <ListItemText
                          primary={client.name}
                          secondary={'R$ '+ Number(client.totalAmount).toLocaleString('pt-BR')}
                          leftSubtitle={"esquerda"}
                          rightSubtitle={"Direita"}
                          chevron={{ color: 'white' }}
                        />
                      </ListItem>                   
                    </div>
                )
                )}
                {!this.state.clientList.length && this.state.didGetClientes 
                  && <ListItem><ListItemText primary="Sem clientes por enquanto."/></ListItem>}
                </List>
              </CardContent>
            </Card> */}
            {this.state.clientList.map((client, indice) => (
				<Card key={client._id} style={{marginBottom:10}}>
					<CardActionArea 
                      component={Link} 
                      to={{ 
                        pathname: '/cadastro',
                        state: client
                      }} >
						<CardContent>
						<Typography gutterBottom variant="h5" component="h2">
							{client.name}
						</Typography>
						<Typography variant="body2" color="textSecondary" component="p">
							R$ {Number(client.totalAmount).toLocaleString('pt-BR')}
						</Typography>
						</CardContent>
                  	</CardActionArea>
              	</Card>
				)	 
			)}
          </Content>
        </Container>
      );
    }  
};

export default Home;
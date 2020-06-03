import React, { Component } from 'react';
import { Content } from "../styles";
import { Container, Button, List, ListItem, ListItemText, Card, CardContent, Divider } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Service from '../services/service';

class Home extends Component {
    state = {
      clientList: []
    };

    componentDidMount() {
      Service.getClients().then(response => {
        this.setState({clientList: response.data});
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
            <Card> 
              <CardContent>
                <List> 
                {this.state.clientList.map(client => (                 
                    <div key={client._id}>
                      <ListItem  
                      button 
                      component={Link} 
                      to={{ 
                        pathname: '/cadastro',
                        state: client
                      }} >
                      <ListItemText
                        primary={client.name}
                        secondary={'R$ '+ Number(client.totalAmount).toLocaleString('pt-BR')}
                      />
                      </ListItem>                    
                      <Divider variant="middle" />
                    </div>
                )
                )}
                </List>
              </CardContent>
            </Card>
          </Content>
        </Container>
      );
    }  
};

export default Home;
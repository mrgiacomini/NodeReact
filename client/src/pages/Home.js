import React, { Component } from 'react';
import { Content } from "../styles";
import { Container, Button, List, ListItem, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom';

class Home extends Component {
    render() {
      return (
        <Container maxWidth="lg">
          <Content>               
            <Button component={Link} to={'/cadastro'} variant="contained" color="primary">Novo</Button>
            <List>                  
              <ListItem>
                <ListItemText
                  primary="Single-line item"
                  secondary='Secondary text'
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Single-line item"
                  secondary='Secondary text'
                />
              </ListItem>
            </List>
          </Content>
        </Container>
      );
    }  
};

export default Home;
import React, { Component } from 'react';
import styled from "styled-components";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
//import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

class Home extends Component {
    render() {
      return (
        <AppBar position="static">
              <Toolbar>
                  <IconButton edge="start" color="inherit" aria-label="Menu">
                      <MenuIcon />
                  </IconButton>
                  <Typography variant="h6" >
                      Navbar Teste
                  </Typography>
                  
              </Toolbar>
          </AppBar>
      );
    }  
};

export default Home;
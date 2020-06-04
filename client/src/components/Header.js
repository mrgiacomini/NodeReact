import React, { Component } from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';

class Header extends Component {
    render() {
      return (
        <AppBar position="static">
              <Toolbar>
                  <IconButton edge="start" color="inherit" aria-label="Menu">
                      <MenuIcon />
                  </IconButton>
                  <Link to={'/'} style={{ textDecoration: 'none', color: 'white' }}>
                  <Typography variant="h6">
                     Giacomini Pinturas
                  </Typography>
                  </Link>
              </Toolbar>
          </AppBar>
      );
    }  
};

export default Header;
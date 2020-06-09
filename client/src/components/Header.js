import React, { Component } from 'react';
import { AppBar, Toolbar, Typography, Grid } from '@material-ui/core';
//import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import { isAuth, signout } from '../helpers/auth';

const Header = () => {
    const logout = () => {
        signout(()=>{});
    }

    return (
    <AppBar position="static">
            <Toolbar>
                {/* <IconButton edge="start" color="inherit" aria-label="Menu">
                    <MenuIcon />
                </IconButton> 
                <Link to={'/'} style={{ textDecoration: 'none', color: 'white' }}> */}
                <Grid container direction="row" justify="space-between">
                <Typography variant="h6" component={Link} to={'/'} style={{ textDecoration: 'none', color: 'white' }}>
                    Giacomini Pinturas
                </Typography>
                { isAuth() &&
                    <Typography variant="subtitle1" onClick={logout} component={Link} to={'/'} style={{ textDecoration: 'none', color: 'white' }}>
                        sair
                    </Typography>
                }
                </Grid>
                {/* </Link> */}
            </Toolbar>
        </AppBar>
    );
};

export default Header;
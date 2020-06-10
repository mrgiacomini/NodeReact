import React from 'react';
import { AppBar, Toolbar, Typography, Grid } from '@material-ui/core';
//import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import { signout } from '../helpers/auth';
import {FiLogOut} from 'react-icons/fi';

function Header(props) {
    const logout = () => {
        signout(props.handleLogout);
    }
    
    return (
    <AppBar position="static">
            <Toolbar>
                {/* <IconButton edge="start" color="inherit" aria-label="Menu">
                    <MenuIcon />
                </IconButton> 
                <Link to={'/'} style={{ textDecoration: 'none', color: 'white' }}> */}
                <Grid container direction="row" justify="space-between" alignItems="baseline">
                    <Typography variant="h6" component={Link} to={'/'} style={{ textDecoration: 'none', color: 'white' }}>
                        Giacomini Pinturas
                    </Typography>
                    { props.loggedIn &&
                        <Typography variant="subtitle1" onClick={logout} component={Link} to={'/'} style={{ textDecoration: 'none', color: 'white' }}>
                            sair  <FiLogOut/>
                        </Typography>
                    }
                </Grid>
                {/* </Link> */}
            </Toolbar>
        </AppBar>
    );
};

export default Header;
import React from 'react';
import { AppBar, Toolbar, Typography, Grid, Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import {FiLogOut} from 'react-icons/fi';
import { useAuth } from '../contexts/auth';

function Header(props) {
    
    const {user, logout} = useAuth();
    
    return (
        <AppBar position="static">
            <Toolbar>
                <Grid container direction="row" justify="space-between" alignItems="center">
                    <Grid item xs={8} md>
                    <Typography variant="h6" component={Link} to={'/'} style={{ textDecoration: 'none', color: 'white' }}>
                        Giacomini Pinturas
                    </Typography>
                    </Grid>
                    { !!user &&
                    <Grid item xs={4} md={2}>
                        <Grid container direction="row" justify="flex-end" alignItems="center">
                        <Avatar src={user?.facebook?.picture?.data?.url} alt={user?.facebook?.name} style={{marginRight: 10}}/> 
                        <Typography variant="subtitle1" onClick={logout} component={Link} to={'/'} style={{ textDecoration: 'none', color: 'white' }}>
                            sair <FiLogOut/>
                        </Typography>
                        </Grid>
                    </Grid>
                    }
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
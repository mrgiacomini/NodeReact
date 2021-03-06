import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Grid, CssBaseline, Drawer, Hidden, List, ListItem, ListItemText,
    IconButton, Avatar} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import {FiLogOut} from 'react-icons/fi';

import { useAuth } from '../../contexts/auth';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
  },
}));

const ResponsiveDrawer = (props) => {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  
  const {user, logout} = useAuth();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const Content = () => {
      return props.content;
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
    
      <List>
        {['Início', 'Funcionários'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Grid container direction="row" justify="space-between" alignItems="center">
            <Grid item xs>
              <Typography variant="h6" component={Link} to={'/'} style={{ textDecoration: 'none', color: 'white' }}>
                  Giacomini Pinturas
              </Typography>
            </Grid>
            { !!user &&
              <Grid item xs={2}>
                <Grid container direction="row" justify="space-between" alignItems="center">
                  <Avatar src={user?.facebook?.picture?.data?.url} alt={user?.facebook?.name}/> 
                  <Typography variant="subtitle1" onClick={logout} component={Link} to={'/'} style={{ textDecoration: 'none', color: 'white' }}>
                    sair <FiLogOut/>
                  </Typography>
                </Grid>
              </Grid>
            }
          </Grid>
        </Toolbar>
      </AppBar>
      <nav aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden  implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Content/>
      </main>
    </div>
  );
}
export default ResponsiveDrawer;
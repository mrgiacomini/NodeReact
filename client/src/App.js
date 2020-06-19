import React from 'react';
import Home from "./pages/Home";
import PrivateRoute from "./components/Routes/private";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Register from './pages/Register/Register';
import Login from './pages/Login/login';
import Drawer from "./components/Drawer/drawer";
import Payments from './pages/Payments/payments';
import { SnackbarProvider } from 'notistack';

import {AuthProvider} from './contexts/auth';

const App = () => {
    return (
      <div>
        <SnackbarProvider maxSnack={3}>
        <BrowserRouter> 
          <AuthProvider>
          <Drawer 
            content={
              <Switch>       
                <Route path="/login" exact render={(props) => <Login {...props} />}/>
                <PrivateRoute path="/" exact component={Home} />
                <PrivateRoute path="/cadastro" exact component={Register} />
                <PrivateRoute path="/pagamentos" exact component={Payments} />
              </Switch>
            }
          />
          </AuthProvider>
        </BrowserRouter>
        </SnackbarProvider>
      </div>
    );
  }

export default App;

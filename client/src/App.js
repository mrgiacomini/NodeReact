import React from 'react';
import Home from "./pages/Home";
import PrivateRoute from "./components/Routes/private";
import AuthRoute from "./components/Routes/auth";
import { BrowserRouter, Switch } from "react-router-dom";
import Register from './pages/Register/Register';
import Login from './pages/Login/login';
//import Drawer from "./components/Drawer/drawer";
import Payments from './pages/Payments/payments';
import { SnackbarProvider } from 'notistack';
import Header from "./components/Header";
import {AuthProvider} from './contexts/auth';

const App = () => {
    return (
      <div>
        <SnackbarProvider maxSnack={3}>
        <BrowserRouter> 
          <AuthProvider>
          <Header/>   
          {/* <Drawer 
            content={ */}
              <Switch>       
                <AuthRoute path="/login" exact component={Login}/>
                <PrivateRoute path="/" exact component={Home} />
                <PrivateRoute path="/cadastro" exact component={Register} />
                <PrivateRoute path="/pagamentos" exact component={Payments} />
              </Switch>
            {/* }
          /> */}
          </AuthProvider>
        </BrowserRouter>
        </SnackbarProvider>
      </div>
    );
  }

export default App;

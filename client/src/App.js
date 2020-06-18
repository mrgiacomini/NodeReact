import React, { Component } from 'react';
import Home from "./pages/Home";
//import Header from "./components/Header";
import PrivateRoute from "./components/Routes/private";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Register from './pages/Register/Register';
import Login from './pages/Login/login';
import { isAuth } from './helpers/auth';
import Drawer from "./components/Drawer/drawer";
import Payments from './pages/Payments/payments';
import { SnackbarProvider } from 'notistack';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {}; 
    this.handleLogout = this.handleLogout.bind(this);  
    this.handleLogin = this.handleLogin.bind(this);  
  }

  handleLogout(){
    this.setState({loggedIn: false});
  }

  handleLogin(user){
    this.setState({loggedIn: user});
  }

  componentDidMount(){
    const user = isAuth();
    if(user){
        this.setState({loggedIn: user}); 
    }
    else{
        this.setState({loggedIn: false}); 
    } 
  }
  render() {
    return (
      <div>
        <SnackbarProvider maxSnack={3}>
        <BrowserRouter> 
          {/* <Header loggedIn={this.state.loggedIn} handleLogout={this.handleLogout}/>    */}
          <Drawer 
            content={
              <Switch>       
                <Route path="/login" exact render={(props) => <Login {...props} handleLogin={this.handleLogin} />}/>
                <PrivateRoute path="/" exact component={Home} />
                <PrivateRoute path="/cadastro" exact component={Register} />
                {/* <PrivateRoute path="/cliente" exact component={Client} /> */}
                <PrivateRoute path="/pagamentos" exact component={Payments} />
              </Switch>
            }
            loggedIn={this.state.loggedIn} 
            handleLogout={this.handleLogout}
          />
        </BrowserRouter>
        </SnackbarProvider>
      </div>
    );
  }
}

export default App;

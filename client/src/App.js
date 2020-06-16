import React, { Component } from 'react';
import Home from "./pages/Home";
import Header from "./components/Header";
import PrivateRoute from "./components/Routes/private";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Register from './pages/Register/Register';
import Login from './pages/Login/login';
import { isAuth } from './helpers/auth';

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

  handleLogin(){
    this.setState({loggedIn: true});
  }

  componentDidMount(){
    if(isAuth()){
        this.setState({loggedIn: true}); 
    }
    else{
        this.setState({loggedIn: false}); 
    } 
  }
  render() {
    return (
      <div>
        <BrowserRouter> 
          <Header loggedIn={this.state.loggedIn} handleLogout={this.handleLogout}/>   
          <Switch>       
            <Route path="/login" exact render={(props) => <Login {...props} handleLogin={this.handleLogin} />}/>
            <PrivateRoute path="/" exact component={Home} />
            <PrivateRoute path="/cadastro" exact component={Register} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

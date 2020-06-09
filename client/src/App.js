import React, { Component } from 'react';
import Home from "./pages/Home";
import Header from "./components/Header";
import PrivateRoute from "./components/Routes/private";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Register from './pages/Register/Register';
import Login from './pages/Login/login';

class App extends Component {

  render() {
    return (
      <div>
        <BrowserRouter> 
          <Header/>   
          <Switch>       
            <PrivateRoute path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            {/* <Route path="/cadastro" exact component={Register} /> */}
            <PrivateRoute path="/cadastro" exact component={Register} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import Home from "./pages/Home";
import Header from "./components/Header";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Register from './pages/Register';

class App extends Component {

  render() {
    return (
      <div>
        <BrowserRouter>
          <Header/>   
          <Switch>       
            <Route path="/" exact component={Home} />
            <Route path="/cadastro" exact component={Register} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import Home from "./pages/Home";
import Header from "./components/Header";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Register from './pages/Register';

class App extends Component {

  render() {
    const styles = {
      background: {
        backgroundColor: "#e9e9e9",
      }
    };

    return (
      <div style={styles.background}>
        <Header/>
        <BrowserRouter>
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

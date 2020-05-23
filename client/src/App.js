import React, { Component } from 'react';
import Home from "./pages/Home";
import Header from "./components/Header";
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {

  render() {
    return (
      <div>
        <Header/>
        <Router>
          <Route path="/" exact component={Home} />
        </Router>
      </div>
    );
  }
}

export default App;

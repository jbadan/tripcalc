import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect
  } from 'react-router-dom';
import './App.css';
import Main from './Main';


class App extends Component {
  render() {
    return (
      <Router>
      <Switch>
        <Route exact path="/" component={Main} />
      </Switch>
    </Router>
    );
  }
}

export default App;

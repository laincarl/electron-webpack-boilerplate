import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import {
  HashRouter as Router, Route, Switch, 
} from 'react-router-dom';
import Main from './containers/Main';
import Company from './containers/Company';
// const { COPYFILE_EXCL } = fs.constants;
class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/p" component={Company} />
        </Switch>
      </Router>
    );
  }
}

export default hot(module)(App);

import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import {
  HashRouter as Router, Route, Switch, 
} from 'react-router-dom';
import Main from './containers/Main';
import Settings from './containers/Settings';
// const { COPYFILE_EXCL } = fs.constants;
class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/Settings" component={Settings} />
        </Switch>
      </Router>
    );
  }
}

export default hot(module)(App);

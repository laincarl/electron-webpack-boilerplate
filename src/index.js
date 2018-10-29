import React from 'react';
import ReactDOM from 'react-dom';

import {
  HashRouter as Router, Route, Switch, 
} from 'react-router-dom';
import App from './App';
import Company from './Company';
import './index.css';

const PageSet = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/p" component={Company} />

    </Switch>
  </Router>
);
ReactDOM.render(<PageSet />, document.getElementById('root'));

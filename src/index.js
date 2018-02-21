const css=require('./index.css');

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import Company from './Company';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

const PageSet = () => (
    <Router>
      <Switch>
        <Route exact path="/" component={ App } />
        <Route path="/p" component={ Company } />

      </Switch>
    </Router>
  )
ReactDOM.render(<PageSet/>, document.getElementById('root'));
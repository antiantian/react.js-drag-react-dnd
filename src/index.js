import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRedirect ,IndexRoute} from 'react-router';
import './style.css';
import routes from './router';
ReactDOM.render((
          <Router history={hashHistory} routes={routes}/>
  ),document.getElementById('qc'));
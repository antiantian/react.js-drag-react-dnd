import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRedirect ,IndexRoute} from 'react-router';
import Main from './main';           //交易列表
import Wrap from './wrap';
import Container from './Container';
import NewDrag from './newDrag';
const routes =(
			   <Route path="/" component={Main}>
                    <IndexRoute component={Container}/>
                    <Route path="/exm1" component={Wrap} />
                    <Route path="/exm2" component={NewDrag} />
                </Route>
);
export default routes;

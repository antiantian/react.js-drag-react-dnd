import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Wrap from './wrap';


export default class SortableSimple extends Component {
  render() {
    return (
        <Wrap/>
    );
  }
}


ReactDOM.render(<SortableSimple/>,document.getElementById('qc'));
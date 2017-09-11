import React, { Component } from 'react';
import {Link,hashHistory  } from 'react-router';

export default class SortableSimple extends Component {
	 constructor(props) {
        super(props);
    }

	componentDidMount(){
		console.log(this.props.children)
	}

  render() {
    return (
      <div className="zcontainer">
         <h1>React Router Tutorial</h1>
         <ul role="nav" className="zcon_nav">
			  <li><Link activeClassName="on" to="/" onlyActiveOnIndex={true}>首页</Link></li> 
			  <li><Link to={{
		        pathname:'/exm1',
		        state: 'hello',
		        }} activeClassName="on">多选按钮组拖拽</Link> </li>
			  <li><Link activeClassName="on" to="/exm2">多选按钮组拖拽2</Link> </li>
         </ul>
         <div className="zcon_wrap">
             {this.props.children}
         </div>
      </div>   
    );
  }
}

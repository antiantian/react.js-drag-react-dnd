import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import SelectContainer from './SelectContainer';
class Wrap extends Component {
	render(){
		return(
		<div>	
           <p>
	          <b><a href="https://github.com/react-dnd/react-dnd/tree/master/examples/04%20Sortable/Simple">Browse the Source</a></b>
	        </p>
	        <p>
	          It is easy to implement a sortable interface with React DnD. Just make the same component both a drag source and a drop target, and reorder the data in the <code>hover</code> handler.
	        </p>
	        <p>00</p>
	        <SelectContainer/>
	     </div>   
	    )
	}
}


export default DragDropContext(HTML5Backend)(Wrap);
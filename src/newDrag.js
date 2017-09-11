import React, { Component } from 'react';
import {Row, Col,Input,Button,Radio,GetFieldDecorator,Checkbox,message,Select} from 'antd';
import {Link,hashHistory  } from 'react-router';
import update from 'react/lib/update';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Select1 from './Select';
import DragSelect from './DragSelect/DragSelect';
const Option = Select.Option;

const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const style = {
  width:'100%',
};

class NewDrag extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div style={style}>
        <DragSelect/>
      </div>
    );
  }
}
export default DragDropContext(HTML5Backend)(NewDrag);
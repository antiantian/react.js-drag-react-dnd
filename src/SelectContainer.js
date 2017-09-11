import React, { Component } from 'react';
import {Row, Col,Input,Button,Radio,GetFieldDecorator,Checkbox,message,Select} from 'antd';
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

//@DragDropContext(HTML5Backend)
class SelectContainer extends Component {
  constructor(props) {
    super(props);
    this.moveCard = this.moveCard.bind(this);
    this.state = {
      cards: [{
        id: 1,
        text: 'Write a cool JS library',
      }, {
        id: 2,
        text: 'Make it generic enough',
      }, {
        id: 3,
        text: 'Write README',
      }, {
        id: 4,
        text: 'Create some examples',
      }, {
        id: 5,
        text: 'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
      }, {
        id: 6,
        text: '???',
      }, {
        id: 7,
        text: 'PROFIT',
      }],
      slectlist:[],
    };
  }

  moveCard(dragIndex, hoverIndex) {
    const { cards } = this.state;
    const dragCard = cards[dragIndex];

    this.setState(update(this.state, {
      cards: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard],
        ],
      },
    }),()=>{
      var arr=[];
      var init=this.state.cards;
       for(let i=0;i<init.length;i++){
           arr.push(init[i].text)
       }
       this.setState({
          slectlist:arr
       })
       
    });
  }

  render() {
    const { cards } = this.state;
    const mess=this.state.slectlist.map((item,index)=>{
           return <span key={index} style={{paddingLeft:'5px'}}>{item}</span>
    })
    return (
      <div style={style}>
        {cards.map((card, i) => (
          <Select1
            key={card.id}
            index={i}
            id={card.id}
            text={card.text}
            moveCard={this.moveCard}
            identfy="select"
          />
        ))}
        <div style={{width:'200px'}}>
           
             <Select
              mode="tags"

              placeholder="Please select"
              defaultValue={['a10', 'c12']}
              value={this.state.slectlist}
              onChange={this.handleChange}
              style={{ width: '100%' }}
            >
              {children}
            </Select>
            <p>{mess}</p>
        </div>
        <hr/>
        <DragSelect/>
        <div style={{width:'200px'}}>         
             <Select
              mode="tags"
              placeholder="Please select"
              defaultValue={['a10', 'c12']}
              value={this.state.slectlist}
              onChange={this.handleChange}
              style={{ width: '100%' }}
            >
              {children}
            </Select>
            <p>{mess}</p>
        </div>
        <hr/>
      </div>
    );
  }
handleChange= (value) => {
  console.log(`Selected: ${value}`);
  var arr=[];
  for(let i=0;i<value.length;i++){
      arr.push({
        id:i+1,
        text:value[i]
      })
  }
  this.setState({
     slectlist:value,
     cards:arr,
  })
}
 onChangeType = (newType) => {
    this.setState({
      newType,
    });
  }
}
const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

//export default DragDropContext(HTML5Backend)(SelectContainer);
export default SelectContainer;
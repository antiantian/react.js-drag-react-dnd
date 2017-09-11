import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import Select1 from './Select';
import update from 'react/lib/update';
require('./DragSelectCss.css');
class DragSelect extends Component {
   constructor(props) {
    super(props);
    this.state={
    	open:false,
        cards:[],
        data:[
        {
        	val:'1',
        	text:'a'
        },],
        slectvalue:[],
        valueList:[],
    };
    this.left="";
    this.top=""
   } 
   componentDidMount(){
    // 获取domconsole.log(findDOMNode(this.refs.head_title))
     	let arr=[];
     	for (let i = 10; i < 36; i++) {
    	  arr.push({
    	  	val:i,
    	  	text:i.toString(36) + i
    	  });
    	}
     	 this.setState({
     	 	data:arr
     	 })
       this.getCurrent();
   }
   getCurrent=()=>{
    var wrap=findDOMNode(this.refs.head_title);
    var browserTop=document.documentElement.scrollTop||document.body.scrollTop;
    var browserLeft=document.documentElement.scrollLeft||document.body.scrollLeft;
    //this.left=wrap.offsetLeft-browserLeft;
    //this.top=wrap.offsetTop-browserTop;
    var Bound=wrap.getBoundingClientRect()
    this.left=Bound.left;
    this.top=2+Bound.height;//Bound.top
    //console.log(this.left+":"+this.top)
   // console.log(Bound)
   }
   moveCard=(dragIndex, hoverIndex)=>{
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
           arr.push(init[i].id)
       }
       this.setState({
          slectvalue:arr
       })
       
    });
  }
  selectClick=()=>{
  	 this.setState({
  	 	open:!this.state.open
  	 })
  }
  openList=()=>{
  	this.setState({
  	 	open:true
  	 })

  }
  closeList=()=>{
  	this.setState({
  	 	open:false
  	 })
  }
   render(){
   	 const { cards } = this.state;
   	 const {open}= this.state;
   	 const left=this.state.open?this.left+"px":"-99999px";
   	 const top=this.state.open?this.top+"px":"-99999px";
     const drop_parent=open?"drop_parent open":"drop_parent";
   	 return(
   	 	<div>
   	 	<p>{this.state.slectvalue.join(",")}</p>
      <img src={require('./checked.png')}/>
   	 	<div style={{...wrap_style,width:'200px'}} className="wrap_wrap">
	        <div style={{width:'200px'}} onClick={this.openList} className="warp_head" ref="head_title">
	           <div style={{...head_style,width:'100%'}} className="warp_head" onClick={this.openList}>
	              {cards.map((card, i) => (
			          <Select1
			            key={card.id}
			            index={i}
			            id={card.id}
			            text={card.text}
			            moveCard={this.moveCard}
			            identfy="select_par"
			          />
			        ))}
	            </div>
	        </div>    
            <div style={{...drop_style,left,top}} className={open?"drop_parent open":"drop_parent"}>
	           <ul style={{...ul_style}}>
	              {
	              	this.state.data.map((item,index)=>{
	              	  const hadClick=this.hadClick(item);
	              	  const styleClick=hadClick?
	              	  {
                        color:'rgba(0, 0, 0, 0.65)',
                        backgroundColor:'#f7f7f7',
	              	  }:
	              	  {
                        backgroundColor:'#ffffff'
	              	  }
	                  return <li 
	                          className={hadClick?'dragClick dragClicked':'dragClick'}
	                          key={index} 
	                          onClick={()=>{
	                          	this.changeList(item)
	                          }}>
	                            {item.text}
	                          </li>
	                })
	              }
	           </ul>
	        </div>   
        </div>
      </div>  
   	 )
   }
   hadClick=(item)=>{
   	 var arr=this.state.slectvalue;
   	 var had=false
   	 if(arr.length>0){
        for(let i=0;i<arr.length;i++){
           if(item.val===arr[i]){
           	 had=true;
           	 break;
           }
        }
   	 }
     return  had;
   }
   cardChange= (item) => {
   	 // console.log(item)
	  var arr=[];
	  for(let i=0;i<item.length;i++){
	      arr.push({
	        id:item[i].val,
	        text:item[i].text
	      })
	  }
	  this.setState({
	     cards:arr,
	  },()=>{
	  	//console.log(this.state.cards)
	  })

	}
   changeList=(item)=>{
   	 const val=item.val;
   	 var arr=this.state.slectvalue;
   	 var arrlist=this.state.valueList;
   	 if(arr.length>0){
   	   let had=false;
       for(let i=0;i<arr.length;i++){
          if(val===arr[i]){
             had=true;
             arr.splice(i,1);
             arrlist.splice(i,1);
             break
          }  
       }
       if(!had){
          arr.push(item.val);
          arrlist.push(item);
       }
   	 }else{
   	 	 arr.push(item.val);
   	 	 arrlist.push(item);
   	 }
   	  this.setState({
   	  	slectvalue:arr,
   	  	valueList:arrlist
   	  },()=>{
   	  	 this.cardChange(this.state.valueList) 
   	  })
     // console.log(item)
      this.getCurrent();
      //this.closeList()
   }
   handleChange= (value) => {
	 // console.log(`Selected: ${value}`);
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
}
const wrap_style={
	minHeight: '28px',
    cursor: 'text',
    zoom: 1,
	outline: 'none',
	position: 'relative',
    lineHeight: '26px',
    boxSizing: 'border-box',
    display: 'block',
    backgroundColor: '#fff',
    borderRadius: '4px',
    border: '1px solid #d9d9d9',
    transition: 'all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)',
};
const head_style = {
  padding: '0 8px',
  cursor: 'move',
  display:'inline-block',
  lineHeight:'22px',
};
const drop_style={
	backgroundColor: '#fff',
    boxShadow: '0 1px 6px rgba(0, 0, 0, 0.2)',
    borderRadius: '4px',
    boxSizing: 'border-box',
    zIndex: 1050,
    position: 'absolute',
    outline: 'none',
    overflow: 'hidden',
    fontSize: '12px',
    width:'100%',
    top:'30px'
}
const ul_style={
    outline: 'none',
    marginBottom: 0,
    paddingLeft: 0,
    listStyle: 'none',
    maxHeight: '250px',
    overflow: 'auto',
};
export default DragSelect;

 document.onclick = function(e){

      e=e||window.event; 
      var element = document.body.getElementsByTagName('*'); 
      var a;
      var nowElement="";
      
      if (e.srcElement) {
        nowElement=e.srcElement;
        var browser=navigator.appName
        var b_version=navigator.appVersion
        var version=b_version.split(";");
        var trim_Version=version[1].replace(/[ ]/g,"");
        if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE6.0")
        {
        a = e.srcElement.getAttribute("className")
        }
        else if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE7.0")
        {
        a = e.srcElement.getAttribute("className")
        } 
        else {
          
        a = e.srcElement.getAttribute("class")  
          }
      }
       else {
        nowElement=e.target;
        a = e.target.getAttribute("class")
      }
         if (a&&a.indexOf("dragClick")<0&&a.indexOf("warp_head")<0||!a) {
            var dragClick=getElementsByClassName("drop_parent");
            for(let i=0;i<dragClick.length;i++){               
               removeClass.call(dragClick[i], 'open')
            }
          //$(".city_list").hide();
        }
       // console.log(a&&!(a.indexOf("warp_head")<0))
        if(a&&!(a.indexOf("warp_head")<0)){
           var parents=getParent(nowElement,'wrap_wrap');//(nowElement.parentNode);
           if(parents){
               var par_childNodes=parents.childNodes;
               for(let i=0;i<par_childNodes.length;i++){
                   var dropElement=par_childNodes[i];
                   var classNames=getClassName(dropElement);
                   if(!(classNames.indexOf("drop_parent")<0)){
                        //addClass(dropElement, 'open')
                        addClass.call(dropElement, 'open');
                   }
               }
           }
        }
      return false      
}
function getClassName(dropElement){
  if(dropElement.getAttribute){
    return dropElement.getAttribute("class")||dropElement.getAttribute("className");
  }else{
    return false;
  }
  
}
function getParent(nowElement,name){
   var parent=nowElement.parentNode;
   var classNamea=getClassName(parent);
   if(classNamea&&!(classNamea.indexOf(name)<0)){
     return parent
   }else{
     return getParent(parent,name)
   }
}
 // 比如 dragClick

    //var dom = document.getElementById('domid');
   // addClass.call(dom, 'newclass'); // 给dom添加名为‘newclass’的classname
  // 添加class
    function addClass( cls )
    {
        return editClass.call( this, "add", cls );
    }
    // 删除class
    function removeClass( cls )
    {
        return editClass.call( this, "remove", cls );
    }
    function getElementsByClassName(n) {
        var classElements = [],allElements = document.getElementsByTagName('*');
         for (var i=0; i< allElements.length; i++ )
        {
         if (allElements[i].className.indexOf(n)>=0) {
              classElements[classElements.length] = allElements[i];
         }
        }
      return classElements;
    }
     // 获取dom属性
    function getAttr( attr )
    {
        return this.getAttribute( attr );
    }
    // 设置属性
    function setAttr( attr, val )
    {
        this.setAttribute( attr, val );
 
        return this;
    };
// 编辑元素class
    function editClass( mode, data )
    {
        var cls = getAttr.call( this, "class" ) || '';
 
        var arr = cls.split( /\s+/ );
 
        switch( mode )
        {
            case "add":
 
                return setAttr.call( this, "class", cls + " " + data );
 
            break;
 
            case "remove":
 
                for( var i = 0; i < arr.length; i++ )
                {
                    if( arr[ i ] == data )
                    {
                        arr.splice( i, 1 );
                    }
                };
 
                var cls = arr.join( " " );
 
                cls = cls.replace( /^\s|\s$/g, "" );
 
                // cls = cls == "" ? null : cls;
 
                return setAttr.call( this, "class", cls );
 
            break;
 
            default:
 
                console.log( "EditClass mode error!" );
 
                return this;
 
            break;
        }
    }
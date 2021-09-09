import React from 'react';
import {Icon } from 'antd';

class List extends React.Component {
    constructor(props) {
      super(props);
      
      this.state = {...props};
    }
    componentDidMount() {
    }
    componentWillReceiveProps(nextProps) {
      this.setState({
        data: nextProps.data
      });
    }
    dragStart(e) {
      this.dragged = e.currentTarget;
    }
    dragEnd(e) {
      this.dragged.style.display = 'block';
      e.target.classList.remove("drag-up");
      this.over ? this.over.classList.remove("drag-up") : '';
  
      e.target.classList.remove("drag-down");
      this.over ? this.over.classList.remove("drag-down") : '';
      
  
      var data = this.state.data;
      var from = Number(this.dragged.dataset.id);
      var to = this.over ? Number(this.over.dataset.id) : '';
      data.splice(to, 0, data.splice(from, 1)[0]);
  
      //set newIndex to judge direction of drag and drop
      data = data.map((doc, index)=> {
        doc.newIndex = index + 1;
        return doc;
      })
      this.props.onSortApplets ? this.props.onSortApplets(data) : '';
      this.setState({data: data});
    }
  
    dragOver(e) {
      e.preventDefault();
  
      this.dragged.style.display = "none";
      
      if (e.target.tagName !== "LI") {
        return;
      }
  
      //判断当前拖拽target 和 经过的target 的 newIndex
  
      const dgIndex = JSON.parse(this.dragged.dataset.item).newIndex;
      const taIndex = JSON.parse(e.target.dataset.item).newIndex;
      const animateName = dgIndex > taIndex ? "drag-up" : "drag-down";
  
  
      if (this.over && e.target.dataset.item !== this.over.dataset.item) {
        this.over.classList.remove("drag-up", "drag-down");
      }
  
      if(!e.target.classList.contains(animateName)) {
        e.target.classList.add(animateName);
        this.over = e.target;
      }
    }
    onDelAppletss(item){
      this.props.onDelApplets ? this.props.onDelApplets(item) : ''
    }
    render() {
      var listItems = this.state.data.map((item, i) => {
        return (
          <li 
            data-id={i}
            key={i}
            style={{float: 'left', cursor: 'pointer'}}
            draggable='true'
            onDragEnd={this.dragEnd.bind(this)}
            onDragStart={this.dragStart.bind(this)}
            data-item={JSON.stringify(item)}
            className="drag-list"
          >
            <img className="img" src={item.icon} width="80" height="80" />
            <Icon className="icon" type="close-circle" theme="filled" style={{color: '#ff524a'}} onClick={this.onDelAppletss.bind(this, item)}/>
            <div className="name">{item.appletsName}</div>
          </li>
        )
       });
      return (
        <ul onDragOver={this.dragOver.bind(this)} className ="drag-box">
          {listItems}
          <div style={{clear: 'both'}}></div>
        </ul>
      )
    }
  }

  export default List;
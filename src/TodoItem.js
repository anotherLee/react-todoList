import React, { Component } from 'react'
import './TodoItem.css'
let classNames = require('classnames')

export default class TodoItem extends Component {
  // constructor(props){
  //   super(props)
  //   this.state = {
  //     active: false
  //   }
  // }
  render(){
    let itemClasses = classNames({
      title: true,
      active: this.props.todo.classActive === true
    })
    return (
      <div className="TodoItem">
        <input id={this.props.todo.id} type="checkbox" checked={this.props.todo.status === 'completed'} onChange={this.toggle.bind(this)} />
        <label htmlFor={this.props.todo.id} className={itemClasses}>{this.props.todo.title}</label>
        <button className="btn" onClick={this.delete.bind(this)}>删除</button>
      </div>
    )
  }

  toggle(e){
    console.log('这是作为props传入的todo: ' + this.props.todo.id)
    this.props.onToggle(e, this.props.todo)
    if (this.props.todo.status === 'completed') {
      this.setState({
        active: true
      })
      console.log(this.state)
    } else {
      this.setState({
        active: false
      })
    }
  }

  delete(e){
    this.props.onDelete(e, this.props.todo)
  }
}
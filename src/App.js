import React, { Component } from 'react'
// import logo from './logo.svg';
import './App.css'
import TodoInput from './TodoInput'
import 'normalize.css'
import './reset.css'
import TodoItem from './TodoItem'
import * as localStore from './localStore'

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      newTodo: '',
      todoList: localStore.load('todoList') || [],
      show: 'all'
    }
  }
  render() {
    let todos
    if(this.state.show === 'all'){
      todos = this.state.todoList
      .filter((item) => !item.deleted)
      .map((item, index) => {
        return (
          <li key={index}>
            <TodoItem todo={item} onToggle={this.toggle.bind(this)} onDelete={this.delete.bind(this)} />
          </li>
        )
      })
    } else if(this.state.show === 'finished'){
      console.log('已完成')
      todos = this.state.todoList
      .filter((item) => !item.deleted && item.status === 'completed')
      .map((item, index) => {
        return (
          <li key={index}>
            <TodoItem todo={item} onToggle={this.toggle.bind(this)} onDelete={this.delete.bind(this)} />
          </li>
        )
      })
    } else if (this.state.show === 'unfinished') {
      console.log('未完成')
      todos = this.state.todoList
        .filter((item) => !item.deleted && item.status === '')
        .map((item, index) => {
          return (
            <li key={index}>
              <TodoItem todo={item} onToggle={this.toggle.bind(this)} onDelete={this.delete.bind(this)} />
            </li>
          )
        })
    }

    return (
      <div className="App">
        <h1>MyTodos</h1>
        <div className="inputWrapper">
          <TodoInput content={this.state.newTodo} onSubmit={this.addTodo.bind(this)} onchange={this.changeTitle.bind(this)} />
        </div>
        <ol className="todoList">
          {todos}
        </ol>
        <div className="counts">
          <span className="child all" onClick={this.showAll.bind(this)}>显示全部</span>
          <span className="child finished" onClick={this.showFinished.bind(this)}>已完成</span>
          <span className="child unFinished" onClick={this.showUnfinished.bind(this)}>未完成</span>
        </div>
      </div>
    )

  }
  addTodo(event) {
    this.state.todoList.push({
      id: idMaker(),
      title: event.target.value,
      status: '',
      deleted: false,
      classActive: false
    })
    this.setState({
      newTodo: '',
      todoList: this.state.todoList
    })
    localStore.save('todoList', this.state.todoList)
  }

  changeTitle(event){
    this.setState({
      newTodo: event.target.value,
      todoList: this.state.todoList
    })
    localStore.save('todoList', this.state.todoList)
  }

  toggle(e, todo){
    todo.status = todo.status === 'completed' ? '' : 'completed'
    if(todo.status === 'completed') {
      todo.classActive = true
    } else {
      todo.classActive = false
    }
    this.setState(this.state)
    localStore.save('todoList', this.state.todoList)
    console.log(this.state)
  }

  delete(e, todo){
    todo.deleted = true
    this.setState(this.state)
    localStore.save('todoList', this.state.todoList)
    console.log(this.state)
  }

  showAll () {
    this.setState({
      show: 'all'
    })
    localStore.save('todoList', this.state.todoList)
  }

  showFinished () {
    this.setState({
      show: 'finished'
    })
    localStore.save('todoList', this.state.todoList)
  }

  showUnfinished() {
    this.setState({
      show: 'unfinished'
    })
    localStore.save('todoList', this.state.todoList)
  }
}

export default App;

let id = 0
function idMaker(){
  id +=1
  return id
}

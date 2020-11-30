import React, { Component } from "react";
import SideMenu from "./components/list/SideMenu";
import MainHeader from "./components/todo/MainHeader";
import TodoContainer from "./components/todo/TodoContainer";
import Dock from "./components/todo/Dock";
import axios from "axios";

const url = "https://tamk-4a00ez62-3001-group08.herokuapp.com/api/";

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentList: 1,
      todos: [],
      doneTodos: [],
      lists: [],
      refresh: false,
    };
  }

  componentDidMount() {
    this.getTasks(true);
    this.getTasks(false);
    this.getLists();
  }
  
  getTasks = (isDone) => {
    axios.get(`${url}tasks/?list_id=${this.state.currentList}&is_done=${isDone}`).then((res) => isDone ? this.setState({ doneTodos: res.data }) : this.setState({ todos: res.data }));
  }
  
  getLists = () => {
    axios.get(`${url}lists/`).then((res) => {
      this.setState({ lists: res.data });
    });
  }

  toggleTodo = (id, checked) => {
    axios
      .put(`${url}tasks/${id}`, {
        is_done: checked,
      })
      .then(() => {
        this.getTasks(checked)
      });
  };

  deleteTodo = (id) => {
    axios.delete(`${url}tasks/${id}`).then(() => {
      this.setState({
        todos: [...this.state.todos.filter((todo) => todo.id !== id)],
      });
    });
  };

  deleteList = (id) => {
    axios.delete(`${url}lists/${id}`).then(() => {
      this.setState({
        lists: [...this.state.lists.filter((list) => list.id !== id)],
      });
    });
  };

  addTodo = (listId, title) => {
    axios
      .post(`${url}tasks/`, {
        listId,
        title,
      })
      .then(() => this.getTasks(false));
  };

  addList = (name) => {
    axios
      .post(`${url}lists/`, {
        name,
      })
      .then(() => {
        axios.get(`${url}lists/`).then((res) => {
          this.setState({ lists: res.data });
          this.setList(res.data[res.data.length-1].id)
        });
      });
  };

  setList = async (listId) => {
    await this.setState({ currentList: listId });
    this.getTasks(false);
    this.getTasks(true);
  };

  getListNameById = () => {
    for (const list of this.state.lists) {
      if (list['id'] === this.state.currentList) {
        return list['name']
      }
    }
  }
  
  render() {
    return (
      <div className="app-container">
        <SideMenu
          lists={this.state.lists}
          deleteList={this.deleteList}
          setList={this.setList}
          addList={this.addList}
        />
        <div className={"main-container"}>
          <MainHeader name={this.getListNameById()} />
          <TodoContainer
            todos={this.state.todos}
            doneTodos={this.state.doneTodos}
            toggleTodo={this.toggleTodo}
            deleteTodo={this.deleteTodo}
          />
          <Dock addTodo={this.addTodo} currentList={this.state.currentList} />
        </div>
      </div>
    );
  }
}

export default App;

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
      lists: [],
      refresh: false,
    };
  }

  componentDidMount() {
    this.getTasks();
    this.getLists();
  }
  
  getTasks = () => {
    axios.get(`${url}tasks/?list_id=${this.state.currentList}`).then((res) => {
      this.setState({ todos: res.data });
    });
  }
  
  getLists = () => {
    axios.get(`${url}lists/`).then((res) => {
      this.setState({ lists: res.data });
    });
  }

  toggleTodo = (id, data) => {
    axios
      .put(`${url}tasks/${id}`, {
        is_done: data,
      })
      .then(() => {
        axios.get(`${url}tasks/`).then((res) => {
          this.setState({ todos: res.data });
        });
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
      .then(() => {
        axios.get(`${url}tasks/`).then((res) => {
          this.setState({ todos: res.data });
        });
      });
  };

  addList = (name) => {
    axios
      .post(`${url}lists/`, {
        name,
      })
      .then(() => {
        axios.get(`${url}lists/`).then((res) => {
          this.setState({ lists: res.data });
        });
      });
  };

  setList = async (listId) => {
    await this.setState({ currentList: listId });
    this.getTasks();
  };
  
  render() {
    return (
      <div className="app-container">
        <SideMenu
          lists={this.state.lists}
          deleteList={this.deleteList}
          setList={this.setList}
        />
        <div className={"main-container"}>
          <MainHeader />
          <TodoContainer
            todos={this.state.todos}
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

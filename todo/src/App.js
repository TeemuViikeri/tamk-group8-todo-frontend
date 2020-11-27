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
      todos: [],
      lists: [],
      refresh: false,
    };
  }

  componentDidMount() {
    axios.get(`${url}tasks/`).then((res) => {
      this.setState({ todos: res.data });
    });

    axios.get(`${url}lists/`).then((res) => {
      this.setState({ lists: res.data });
    });
  }

  toggleTodo = (id) => {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id === id) {
          todo.is_done = !todo.is_done;
        }

        return todo;
      }),
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

  render() {
    return (
      <div className="app-container">
        <SideMenu lists={this.state.lists} deleteList={this.deleteList} />
        <div className={"main-container"}>
          <MainHeader />
          <TodoContainer
            todos={this.state.todos}
            toggleTodo={this.toggleTodo}
            deleteTodo={this.deleteTodo}
          />
          <Dock addTodo={this.addTodo} />
        </div>
      </div>
    );
  }
}

export default App;

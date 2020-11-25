import React, { Component } from "react";
import SideMenu from "./components/list/SideMenu";
import MainHeader from "./components/todo/MainHeader";
import TodoContainer from "./components/todo/TodoContainer";
import Dock from "./components/todo/Dock";
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      refresh: false,
    };
  }

  componentDidMount() {
    axios
      .get("https://tamk-4a00ez62-3001-group08.herokuapp.com/api/tasks/")
      .then((res) => {
        this.setState({ todos: res.data });
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
    axios
      .delete(
        `https://tamk-4a00ez62-3001-group08.herokuapp.com/api/tasks/${id}`
      )
      .then(() => {
        this.setState({
          todos: [...this.state.todos.filter((todo) => todo.id !== id)],
        });
      });
  };

  addTodo = (listId, title) => {
    axios
      .post("https://tamk-4a00ez62-3001-group08.herokuapp.com/api/tasks/", {
        listId,
        title,
      })
      .then(() => {
        axios
          .get("https://tamk-4a00ez62-3001-group08.herokuapp.com/api/tasks/")
          .then((res) => {
            this.setState({ todos: res.data });
          });
      });
  };

  render() {
    return (
      <div className="app-container">
          <SideMenu />
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

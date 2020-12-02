import React, { Component } from "react";
import SideMenu from "./components/list/SideMenu";
import MainHeader from "./components/todo/MainHeader";
import TodoContainer from "./components/todo/TodoContainer";
import Dock from "./components/todo/Dock";
import axios from "axios";

const url = "https://tamk-4a00ez62-3001-group08.herokuapp.com/api/";
const apikey = process.env.REACT_APP_BACKEND_APIKEY;

class App extends Component {
  constructor() {
    super();
    this.state = {
      orderTasks: '+created',
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
    axios.get(`${url}tasks/?apikey=${apikey}&list_id=${this.state.currentList}&is_done=${isDone}&sort=${this.state.orderTasks}`)
    .then((res) => isDone ? this.setState({ doneTodos: res.data }) : this.setState({ todos: res.data }));
  }
  
  getLists = () => {
    axios.get(`${url}lists/?apikey=${apikey}`).then((res) => {
      this.setState({ lists: res.data });
    });
  }

  toggleTodo = (id, checked) => {
    axios
      .put(`${url}tasks/${id}?apikey=${apikey}`, {
        is_done: checked,
      })
      .then(() => {
        this.getTasks(checked)
        this.getTasks(!checked)
      });
  };

  deleteTodo = (id, checked) => {
    axios.delete(`${url}tasks/${id}?apikey=${apikey}`).then(() => {
      checked ?
      this.setState({
        doneTodos: [...this.state.doneTodos.filter((todo) => todo.id !== id)],
      })
      : this.setState({
        todos: [...this.state.todos.filter((todo) => todo.id !== id)],
      });
    });
  };

  deleteList = (id) => {
    axios.delete(`${url}lists/${id}?apikey=${apikey}`).then(() => {
      this.setState({
        lists: [...this.state.lists.filter((list) => list.id !== id)],
      });
    });
  };

  addTodo = (listId, title) => {
    axios
      .post(`${url}tasks/?apikey=${apikey}`, {
        listId,
        title,
      })
      .then(() => this.getTasks(false));
  };

  addList = (name) => {
    axios
      .post(`${url}lists/?apikey=${apikey}`, {
        name,
      })
      .then(() => {
        axios.get(`${url}lists/?apikey=${apikey}`).then((res) => {
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

  setOrderTasks = async (order) => {
    await this.setState({ orderTasks: order });
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
          <MainHeader 
            name={this.getListNameById()}
            setOrderTasks={this.setOrderTasks}
          />
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

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
      deadlineFilter: '',
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
    axios.get(`${url}tasks/?apikey=${apikey}&list_id=${this.state.currentList}&is_done=${isDone}${this.getDeadlineFilter()}&sort=${this.state.orderTasks}`)
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
        this.getTasks(true)
        this.getTasks(false)
      });
  };

  setTodoPriority = (id, priorityValue) => {
    axios
      .put(`${url}tasks/${id}?apikey=${apikey}`, {
        priority: priorityValue,
      });
  };
    
  editTodo = (id, title) => {
    axios
      .put(`${url}tasks/${id}?apikey=${apikey}`, { title })
      .then(() => {
        this.getTasks(true)
        this.getTasks(false)
      });
  };

  setTodoDeadline = (id, deadlineDate) => {
    axios
      .put(`${url}tasks/${id}?apikey=${apikey}`, {
        deadline: `${deadlineDate._d.getFullYear()}-${deadlineDate._d.getMonth() + 1}-${deadlineDate._d.getDate()}`,
      })
      .then(() => {
        this.getTasks(true)
        this.getTasks(false)
      });
  };

  setTodoDeadlineNull = (id) => {
    axios
      .put(`${url}tasks/${id}?apikey=${apikey}`, {
        deadline: `NULL`,
      })
      .then(() => {
        this.getTasks(true)
        this.getTasks(false)
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
  };

  setDeadlineFilter = async (dlFilter) => {
    await this.setState({ deadlineFilter: dlFilter });
    this.getTasks(false);
    this.getTasks(true);
  };

  getDeadlineFilter = () => {
    let dl = `&deadline=${this.state.deadlineFilter}`;
    if (dl === '&deadline=') {
      dl = '';
    }
    return dl;
  };

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
            setDeadlineFilter={this.setDeadlineFilter}
          />
          <TodoContainer
            todos={this.state.todos}
            doneTodos={this.state.doneTodos}
            toggleTodo={this.toggleTodo}
            setTodoPriority={this.setTodoPriority}
            setTodoDeadline={this.setTodoDeadline}
            editTodo={this.editTodo}
            deleteTodo={this.deleteTodo}
            setTodoDeadlineNull={this.setTodoDeadlineNull}
          />
          <Dock 
            width="80%"
            bgColor="#cc5252"
            addTodo={this.addTodo} 
            currentList={this.state.currentList} 
            />
        </div>
      </div>
    );
  }
}

export default App;

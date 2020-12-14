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
      todosCount: 1,
      doneTodos: [],
      doneTodosCount: 1,
      lists: [],
      refresh: false,
      sideMenuIsOpen: false,
      notDonePaginationLimit: 11,
      notDonePaginationOffset: 0,
      notDonePageCount: 1,
      notDoneCurrentPage: 0,
      donePaginationLimit: 11,
      donePaginationOffset: 0,
      donePageCount: 1,
      doneCurrentPage: 0,
    };
  }

  componentDidMount() {
    this.getTasks(true);
    this.getTasks(false);
    this.getLists();
    this.getTasksCount(true);
    this.getTasksCount(false);
    this.getPageCount(true, this.state.donePaginationLimit, this.state.doneTodosCount)
    this.getPageCount(true, this.state.notDonePaginationLimit, this.state.todosCount)
  }
  
  getTasks = (isDone) => {
    axios.get(`${url}tasks/?apikey=${apikey}&list_id=${this.state.currentList}&is_done=${isDone}${this.getDeadlineFilter()}&sort=${this.state.orderTasks}&limit=${this.getPaginationLimit(isDone)}&offset=${this.getPaginationOffset(isDone)}`)
    .then((res) => isDone ? this.setState({ doneTodos: res.data }) : this.setState({ todos: res.data }))
    .then(this.getTasksCount(isDone));
  }

  getTasksCount = (isDone) => {
    axios.get(`${url}tasks/?apikey=${apikey}&list_id=${this.state.currentList}&is_done=${isDone}${this.getDeadlineFilter()}&count=true`)
    .then((res) => isDone ? this.setState({ doneTodosCount: res.data[0].count }) : this.setState({ todosCount: res.data[0].count }))
    .then(() => {
      if (isDone) {
        this.getPageCount(true, this.state.donePaginationLimit, this.state.doneTodosCount)
      } else {
        this.getPageCount(false, this.state.notDonePaginationLimit, this.state.todosCount)
      }
      });
  }

  getPageCount = (isDone, limit, count)  => {
    if (isDone) {
      this.setState({ donePageCount: Math.ceil(count / limit) })
    } else {
      this.setState({ notDonePageCount: Math.ceil(count / limit) })
    }
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
      })
      .then(() => {
        this.getTasks(true)
        this.getTasks(false)
      });
  };
    
  editList = (id, name) => {
    axios
      .put(`${url}lists/${id}?apikey=${apikey}`, { name })
      .then(() => this.getLists());
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

  openSideMenu = () => {
    const el = document.getElementById('sideMenu')
    el.style.width = "20%"
    el.style.transition = "width 0.5s"
  };

  closeSideMenu = () => {
    const el = document.getElementById('sideMenu')
    el.style.width = "0%"
    el.style.transition = "width 0.5s"
  };

  getPaginationLimit = done => {
    if (done) {
      return this.state.donePaginationLimit;
    } else {
      return this.state.notDonePaginationLimit;
    }
  }

  getPaginationOffset = done => {
    if (done) {
      return this.state.donePaginationOffset;
    } else {
      return this.state.notDonePaginationOffset;
    }
  }

  setOffset = (done, newOffset) => {
    if (done) {
      this.setState({ donePaginationOffset: newOffset })
    } else {
      this.setState({ notDonePaginationOffset: newOffset })
    }
  }

  setCurrentPage = (done, newPage) => {
    if (done) {
      this.setState({ doneCurrentPage: newPage })
    } else {
      this.setState({ notDoneCurrentPage: newPage })
    }
  }

  setColor = (id, color) => {
    axios
      .put(`${url}lists/${id}?apikey=${apikey}`, { color })
      .then(() => this.getLists());
  }

  render() {
    return (
      <div className="app-container">
        <SideMenu
          lists={this.state.lists}
          deleteList={this.deleteList}
          setList={this.setList}
          addList={this.addList}
          editList={this.editList}
          currentList={this.state.currentList}
        />
        <div className={"main-container"}>
          <MainHeader 
            name={this.getListNameById()}
            setOrderTasks={this.setOrderTasks}
            setDeadlineFilter={this.setDeadlineFilter}
            flex="1"
            openSideMenu={this.openSideMenu}
            closeSideMenu={this.closeSideMenu}
            setColor={this.setColor}
            currentList={this.state.currentList}
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
            flex="21"
            todosCount={this.state.todosCount}
            doneTodosCount={this.state.doneTodosCount}
            getPaginationOffset={this.getPaginationOffset}
            getPaginationLimit={this.getPaginationLimit}
            setOffset={this.setOffset}
            getTasks={this.getTasks}
            notDonePageCount={this.state.notDonePageCount}
            donePageCount={this.state.donePageCount}
            setCurrentPage={this.setCurrentPage}
            notDoneCurrentPage={this.state.notDoneCurrentPage}
            doneCurrentPage={this.state.doneCurrentPage}
            currentList={this.state.currentList}
          />
          <Dock 
            bgColor="#cc5252"
            addTodo={this.addTodo} 
            currentList={this.state.currentList}
            flex="1"
            />
        </div>
      </div>
    );
  }
}

export default App;

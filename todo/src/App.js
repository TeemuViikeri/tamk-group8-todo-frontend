import React, { Component } from "react";
import SideMenu from "./components/list/SideMenu";
import MainHeader from "./components/todo/MainHeader";
import TodoContainer from "./components/todo/TodoContainer";
import Dock from "./components/todo/Dock";
import axios from "axios";
import colors from "./colors";

const url = "https://tamk-4a00ez62-3001-group08.herokuapp.com/api/";
const apikey = process.env.REACT_APP_BACKEND_APIKEY;

class App extends Component {
  constructor() {
    super();

    this.state = {
      searchTasks: null,
      deadlineFilter: '',
      orderTasks: '+created',
      currentList: 1,
      currentColor: 0,
      todos: [],
      todosCount: 1,
      doneTodos: [],
      doneTodosCount: 1,
      lists: [],
      refresh: false,
      sideMenuIsOpen: false,
      notDonePaginationLimit: 10,
      notDonePaginationOffset: 0,
      notDonePageCount: 1,
      notDoneCurrentPage: 0,
      donePaginationLimit: 10,
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
    this.getListColor(this.state.currentList)
  }

  /**
   * call backend with APIKey and any required filters and sorters included. 
   * Pagination included at the end of the string.
   * 
   * @param {boolean} isDone so the same function can be used for getting finished and unfinished tasks.
   */
  getTasks = (isDone) => {
    axios.get(`${url}tasks/?apikey=${apikey}&list_id=${this.state.currentList}&is_done=${isDone}${this.getDeadlineFilter()}&sort=${this.state.orderTasks}&limit=${this.getPaginationLimit(isDone)}&offset=${this.getPaginationOffset(isDone)}`)
    .then((res) => isDone ? this.setState({ doneTodos: res.data }) : this.setState({ todos: res.data }))
    .then(this.getTasksCount(isDone))
    .then(this.getListColor(this.state.currentList));
  }

  /**
   * Used for checking the color of the list when the page is first loaded
   * and when switching to a new list/refreshing tasks.
   * 
   * @param {int} listId id of the list whose color is being requested.
   */
  getListColor = (listId) => {
    axios.get(`${url}lists/${listId}?apikey=${apikey}`).then((res) => {
      this.setState({ currentColor: res.data[0].color });
    });
  }

  /**
   * Get a count of tasks for pagination from backend to save on the amount of data
   * that has to be downloaded.
   * 
   * @param {boolean} isDone so the same function can be used for counting finished and unfinished tasks.
   */
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

  /**
   * Calculate the amount of pages by dividing the amount of tasks
   * with the limit per page and rounding up.
   * 
   * @param {boolean} isDone so the same function can be used with finished and unfinished tasks.
   * @param {int} limit the amount of tasks that can be loaded at the same time.
   * @param {int} count The amount of todos.
   */
  getPageCount = (isDone, limit, count)  => {
    if (isDone) {
      this.setState({ donePageCount: Math.ceil(count / limit) })
    } else {
      this.setState({ notDonePageCount: Math.ceil(count / limit) })
    }
  }

  /**
   * get every list from the backend, apikey included.
   */
  getLists = () => {
    axios.get(`${url}lists/?apikey=${apikey}`).then((res) => {
      this.setState({ lists: res.data });
    });
  }


  /**
   * update database boolean value of given id to the given value.
   * 
   * @param {int} id id of the task being modified.
   * @param {boolean} checked the new value of the todo.
   */
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

  /**
   * update priority value of given id to priorityValue.
   * The number is treated to be anywhere between 1 and 5.
   * 5 means highest priority while 1 means the lowest.
   * 
   * @param {int} id id of the task being modified.
   * @param {int} priorityValue the new priority value being assigned.
   */
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
    
  /**
   * This method is used for updating list names.
   * 
   * @param {int} id  id of the list being modified.
   * @param {string} name the new value of the list name being assigned.
   */
  editList = (id, name) => {
    axios
      .put(`${url}lists/${id}?apikey=${apikey}`, { name })
      .then(() => this.getLists());
  };

  /**
   * This method is used for updating task texts.
   * 
   * @param {int} id id of the task being modified.
   * @param {string} title the new value of the task text being assigned.
   */
  editTodo = (id, title) => {
    axios
      .put(`${url}tasks/${id}?apikey=${apikey}`, { title })
      .then(() => {
        this.getTasks(true)
        this.getTasks(false)
      });
  };

  /**
   * This method is used for setting the deadline date of the task.
   * Only the year, month and day are saved following the ISO 8601 standard.
   * 
   * @param {int} id id of the task being modified.
   * @param {date} deadlineDate the value of the deadline date being assigned.
   */
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

  /**
   * This method is used for setting the deadline as null.
   * In the database this appears as "0000-00-00".
   * 
   * @param {int} id id of the task being modified.
   */
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

  /**
   * This method deletes the task of given Id from local- and serverside data.
   * Also refreshes taskCount and PageCount after that for pagination purposes.
   * 
   * @param {int} id id of the task being deleted.
   * @param {boolean} checked used to determine where to delete the local data.
   */
  deleteTodo = (id, checked) => {
    axios.delete(`${url}tasks/${id}?apikey=${apikey}`).then(() => {
      if (checked) {
        this.setState({ doneTodos: [...this.state.doneTodos.filter((todo) => todo.id !== id)] });
        this.getTasksCount(true);
        this.getPageCount(true, this.state.donePaginationLimit, this.state.doneTodosCount);
      } else {
        this.setState({ todos: [...this.state.todos.filter((todo) => todo.id !== id)] });
        this.getTasksCount(false);
        this.getPageCount(false, this.state.notDonePaginationLimit, this.state.todosCount);
      }
    });
  };

  /**
   * delete the list of given id from local- and serverside data.
   * 
   * @param {int} id id of the list being deleted.
   */
  deleteList = (id) => {
    axios.delete(`${url}lists/${id}?apikey=${apikey}`).then(() => {
      this.setState({
        lists: [...this.state.lists.filter((list) => list.id !== id)],
      });
    });
  };

  /**
   * add a new task and include list Id for the database to use as a foreign key
   * and the text content of the task, rest of the data is assigned as defaults.
   * 
   * @param {int} listId id of the list the list the task will be included in.
   * @param {string} title the text content of the new task.
   */
  addTodo = (listId, title) => {
    axios
      .post(`${url}tasks/?apikey=${apikey}`, {
        listId,
        title,
      })
      .then(() => this.getTasks(false), this.getTasks(true));
  };

  /**
   * Create a new list, only name is required since everything else is assigned
   * to its default values.
   * 
   * @param {string} name The name of the new list.
   */
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

  /**
   * Update currentList value and load new tasks with the value as a filter.
   * 
   * @param {int} listId id of the list that'll be used in the getTasks filters.
   */
  setList = async (listId) => {
    await this.setState({ currentList: listId });
    this.getTasks(false);
    this.getTasks(true);
  };

  /**
   * assign sorter(s) and refresh current tasks with the new sorter.
   * 
   * @param {string} order includes sorting values separated by a "," symbol.
   */
  setOrderTasks = async (order) => {
    await this.setState({ orderTasks: order });
    this.getTasks(false);
    this.getTasks(true);
  };

  /**
   * Iterate through current array of lists and find where Id matches currentList.
   * Then return the name of that list to be used in the MainHeader.js
   */
  getListNameById = () => {
    for (const list of this.state.lists) {
      if (list['id'] === this.state.currentList) {
        return list['name']
      }
    }
  };

  /**
   * Set deadline filter to be used with getTasks()
   * Then refresh the tasks to apply the filter.
   * 
   * Only used in FilterMenu.js and chooses between showing all tasks or
   * only those either with or without a deadline date.
   * 
   * @param {string} dlFilter is sent either empty, "null" or "notNull" String.
   */
  setDeadlineFilter = async (dlFilter) => {
    await this.setState({ deadlineFilter: dlFilter });
    this.getTasks(false);
    this.getTasks(true);
  };

  /**
   * used to either add the deadline filter to getTasks
   * or if the deadlineFilter String is empty return an empty string
   * as to not mess with the rest of the get request.
   */
  getDeadlineFilter = () => {
    let dl = `&deadline=${this.state.deadlineFilter}`;
    if (dl === '&deadline=') {
      dl = '';
    }
    return dl;
  };

  // Used for animated opening and closing of the list menu.
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

  /** 
   * Getters and setters for client-side pagination variables.
   * @param {boolean} done is used on each to switch between finished and unfinished tasks.
   */
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

  // Color getters and setters.
  setColor = async (id, color) => {
    await axios.put(`${url}lists/${id}?apikey=${apikey}`, { color })
    await this.getLists()
    await this.setState({ currentColor: color })
  }

  getCurrentColor = () => {
    const colorCode = this.state.currentColor
    const colorCodes = {red: 0, blue: 1, green: 2, violet: 3, dark: 4}

    for (const key in colorCodes) {
      if (colorCodes[key] === colorCode) return key;
    }
  }

  handleOnKeyUp = async (title) => {
    if (title === "") {
      return
    }

    const results = await axios.get(`${url}tasks/?apikey=${apikey}&search_title=${title}`)
    const tasks = results.data
    await this.setState({ searchTasks: tasks })
  }

  render() {
    const color = this.getCurrentColor();
    const palette = colors[color];
    document.body.style.backgroundColor = palette.bgPrimary;

    return (
      <div className="app-container" style={{
          display: "flex",
          height: "100vh"
        }}
      >
        {/* Includes lists and the input for adding new lists. */}
        <SideMenu
          lists={this.state.lists}
          deleteList={this.deleteList}
          setList={this.setList}
          addList={this.addList}
          editList={this.editList}
          currentList={this.state.currentList}
          palette={palette}
          
        />
        <div className={"main-container"} style={{
            width: "100%",
            height: "100%",
            flex: "auto",
            backgroundColor: palette.bgPrimary,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Includes the title and dropdown menus for customization.*/}
          <MainHeader 
            flex="initial"
            palette={palette}
            currentList={this.state.currentList}
            searchTasks={this.state.searchTasks}
            lists={this.state.lists}
            openSideMenu={this.openSideMenu}
            closeSideMenu={this.closeSideMenu}
            name={this.getListNameById()}
            handleOnKeyUp={this.handleOnKeyUp}
            setColor={this.setColor}
            setOrderTasks={this.setOrderTasks}
            setDeadlineFilter={this.setDeadlineFilter}
          />

          {/* Includes tasks, all of their associated buttons 
              as well as pagination, subheaders and 
              carets for collapsing the content. */}
          <TodoContainer
            todos={this.state.todos}
            doneTodos={this.state.doneTodos}
            toggleTodo={this.toggleTodo}
            setTodoPriority={this.setTodoPriority}
            setTodoDeadline={this.setTodoDeadline}
            editTodo={this.editTodo}
            deleteTodo={this.deleteTodo}
            setTodoDeadlineNull={this.setTodoDeadlineNull}
            flex="auto"
            palette={palette}
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
            currentColor={this.state.currentColor}
            notDonePaginationOffset={this.state.notDonePaginationOffset}
            donePaginationOffset={this.state.donePaginationOffset}
          />
          {/* Include inputs for creating new tasks.*/}
          <Dock 
            addTodo={this.addTodo} 
            currentList={this.state.currentList}
            flex="initial"
            palette={palette}
          />
        </div>
      </div>
    );
  }
}

export default App;

import React, { Component } from "react";
import TodoItem from "./TodoItem";
import Subheader from "./Subheader";
import ReactPaginate from 'react-paginate';

// Each css file is identical apart from color settings and .colorSet elements.
// When colorSet className gets updated the file of that value takes over.
import "./css/pagination0.css";
import "./css/pagination1.css";
import "./css/pagination2.css";
import "./css/pagination3.css";
import "./css/pagination4.css";

class TodoContainer extends Component {
  constructor(props) {
    super(props);

    const map = new Map();
    map.set(1, ["100%", false])
    map.set(2, ["100%", false])

    this.state = {
      todos: [],
      display: map,
      notDoneCurrentPage: 0,
      doneCurrentPage: 0,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.display !== prevState.display) {
      this.getWrapperStyle("wrapper-1")
      this.getWrapperStyle("wrapper-2")
    }

    // If list is changed reset pagination.
    if (this.props.currentList !== prevProps.currentList) {
      this.setState({ notDoneCurrentPage: 0 })
      this.setState({ doneCurrentPage: 0 })
      this.props.setOffset(true, 0)
      this.props.setOffset(false, 0)
      this.props.setCurrentPage(true, this.state.doneCurrentPage)
      this.props.setCurrentPage(false, this.state.notDoneCurrentPage)
    }

    // Check if pagination is on an empty page, change to previous page if true.
    this.ifEmptyPage()
    if (prevProps.donePaginationOffset !== this.props.getPaginationOffset(true)) {
      this.props.getTasks(true)
    }
    if (prevProps.notDonePaginationOffset !== this.props.getPaginationOffset(false)) {
      this.props.getTasks(false)
    }
  }

  /**
   * Check both tasks lists if the current page is larger than pageCount.
   * If true move to last page and update the offset accordingly.
   */ 
  ifEmptyPage = async () => {
    if (this.state.notDoneCurrentPage >= this.props.notDonePageCount) {

      let offset = (this.props.notDonePageCount - 1) * this.props.getPaginationLimit(false);
      this.props.setOffset(false, offset);

      this.setState({ notDoneCurrentPage: this.props.notDonePageCount - 1 })
      this.props.setCurrentPage(false, this.state.notDoneCurrentPage)
    }

    if (this.state.doneCurrentPage >= this.props.donePageCount) {

      let offset = (this.props.donePageCount - 1) * this.props.getPaginationLimit(true);
      this.props.setOffset(true, offset);
      console.log(offset)

      this.setState({ doneCurrentPage: this.props.donePageCount - 1 })
      this.props.setCurrentPage(true, this.state.doneCurrentPage)
    }
  }

  getFlexContainerStyle = () => {
    return {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-evenly",
      flex: this.props.flex,
      minHeight: "0"
    }
  }

  getWrapperStyle = (wrapperId) => {    
    const e = document.getElementById(wrapperId);
    const id = wrapperId.slice(-1, wrapperId.length); 
    const d = this.state.display.get(Number(id))[0];
    e.style.height = d;
  }

  toggleDisplay = (subheaderId) => {
    const m = new Map(this.state.display)
    const id = subheaderId.slice(-1, subheaderId.length);
    // d === displayed height which is either 0px or 100% of parent container
    const d = m.get(Number(id))[0];
    // b === boolean value for caret: up (true) or down (false)
    const b = m.get(Number(id))[1];
    
    m.set(Number(id), d === "100%" && b === false ? [0, !b] : ["100%", !b]);

    this.setState({ display: m })
  }

  // take selected page and calculate offset based on pagination limit and page number.
  // Then update current page and reload tasks.
  handleNotDonePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.props.getPaginationLimit(false);

    this.props.setOffset(false, offset);
    this.props.setCurrentPage(false, selectedPage);
    this.setState({
        notDoneCurrentPage: selectedPage,
    }, () => {
        this.props.getTasks(false)
    });

  };

  handleDonePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.props.getPaginationLimit(true);

    this.props.setOffset(true, offset);
    this.props.setCurrentPage(true, selectedPage)
    this.setState({
        doneCurrentPage: selectedPage,
    }, () => {
        this.props.getTasks(true)
    });

  };

  render() {
    return (
      <div style={this.getFlexContainerStyle()}>
        {/* Subheader and caret for unfinished tasks */}
        <div style={{ width: "50%", height: "80%", padding: "1.5rem", margin: "1.5rem" }}>
          <Subheader  
            id={"sub-1"}
            name="To Do"
            toggleDisplay={this.toggleDisplay}
            up={this.state.display.get(1)[1]}
            palette={this.props.palette}
          />
          <div id="wrapper-1" style={{ height: "100%", transition: "height 1s", overflowY: "auto" }}>
            {/* Iterate through and render unfinished tasks */}
            {this.props.todos.map((todo) => {
              return (
                <TodoItem
                  key={todo.id} 
                  todo={todo}
                  toggleTodo={this.props.toggleTodo}
                  setTodoPriority={this.props.setTodoPriority}
                  setTodoDeadline={this.props.setTodoDeadline}
                  editTodo={this.props.editTodo}
                  deleteTodo={this.props.deleteTodo}
                  checked={todo.is_done}
                  setTodoDeadlineNull={this.props.setTodoDeadlineNull}
                  palette={this.props.palette}
                />
              );
            })}
          </div>
          {/* Set classname according to current customization settings for CSS */}
          <div className={`colorSet${this.props.currentColor}`}>
            {/* If more than 1 page exists render pagination */}
            {this.props.notDonePageCount > 1
              ? <ReactPaginate
                  previousLabel={"prev"}
                  nextLabel={"next"}
                  breakLabel={"..."}
                  breakClassName={"break-me"}
                  pageCount={this.props.notDonePageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={this.handleNotDonePageClick}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
                  activeClassName={"active"}
                  forcePage={this.state.notDoneCurrentPage}
                />
              : <p>{""}</p>
            }
          </div>
        </div>
        {/* Subheader and caret for finished tasks */}
        <div style={{ width: "50%", height: "80%", padding: "1.5rem", margin: "1.5rem" }}>
          <Subheader  
            id="sub-2"
            name="Done" 
            toggleDisplay={this.toggleDisplay}
            up={this.state.display.get(2)[1]}
            palette={this.props.palette}
          />
          <div id="wrapper-2" style={{ height: "100%", transition: "height 1s", overflowY: "auto" }}>
            {/* Iterate through and render finished tasks */}
            {this.props.doneTodos.map((todo) => {
              return (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  toggleTodo={this.props.toggleTodo}
                  setTodoPriority={this.props.setTodoPriority}
                  setTodoDeadline={this.props.setTodoDeadline}
                  editTodo={this.props.editTodo}
                  deleteTodo={this.props.deleteTodo}
                  checked={todo.is_done}
                  setTodoDeadlineNull={this.props.setTodoDeadlineNull}
                  palette={this.props.palette}
                />
              );
            })}
          </div>
          {/* Set classname according to current customization settings for CSS */}
          <div className={`colorSet${this.props.currentColor}`}>
          {/* If more than 1 page exists render pagination */}
          {this.props.donePageCount > 1
            ? <ReactPaginate
                previousLabel={"prev"}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={this.props.donePageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.handleDonePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
                forcePage={this.state.doneCurrentPage}
              />
            : <p>{""}</p>
          }
          </div>
        </div>
      </div>
    );
  }
}

export default TodoContainer;

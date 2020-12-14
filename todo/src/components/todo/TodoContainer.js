import React, { Component } from "react";
import TodoItem from "./TodoItem";
import Subheader from "./Subheader";
import ReactPaginate from 'react-paginate';
import "./pagination.css"

class TodoContainer extends Component {
  constructor(props) {
    super(props);

    const map = new Map();
    map.set(1, ["92%", false])
    map.set(2, ["92%", false])

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
  }

  getFlexContainerStyle = () => {
    return {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-evenly",
      flex: this.props.flex,
    }
  }

  getWrapperStyle = (wrapperId) => {    
    const e = document.getElementById(wrapperId);
    const id = wrapperId.slice(-1, wrapperId.length); 
    const d = this.state.display.get(Number(id))[0];
    e.style.height = d;
    e.style.transition = "height 1s"
    e.style.overflow = "hidden"
  }

  toggleDisplay = (subheaderId) => {
    const m = new Map(this.state.display)
    const id = subheaderId.slice(-1, subheaderId.length);
    // d === displayed height which is either 0px or 92% of parent container
    const d = m.get(Number(id))[0];
    // b === boolean value for caret: up (true) or down (false)
    const b = m.get(Number(id))[1];
    
    m.set(Number(id), d === "92%" && b === false ? [0, !b] : ["92%", !b]);

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
        <div style={{ width: "50%", padding: "24px", margin: "24px" }}>
          <Subheader  
            id={"sub-1"}
            name="To Do"
            toggleDisplay={this.toggleDisplay}
            up={this.state.display.get(1)[1]}
            />
          <div id="wrapper-1">
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
                />
              );
            })}
          </div>
          <div>
            <ReactPaginate
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
          </div>
        </div>
        <div style={{ width: "50%", padding: "24px", margin: "24px" }}>
          <Subheader  
            id="sub-2"
            name="Done" 
            toggleDisplay={this.toggleDisplay}
            up={this.state.display.get(2)[1]}
          />
          <div id="wrapper-2">
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
                />
              );
            })}
          </div>
          <div>
            <ReactPaginate
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
          </div>
        </div>
      </div>
    );
  }
}

export default TodoContainer;

import React, { Component } from "react";
import TodoItem from "./TodoItem";
import Subheader from "./Subheader";
import ReactPaginate from 'react-paginate';
import "./pagination.css"

class TodoContainer extends Component {
  constructor(props) {
    super(props);

    const map = new Map();
    map.set(1, ["block", false])
    map.set(2, ["block", false])

    this.state = {
      todos: [],
      display: map,
      notDoneCurrentPage: 0,
      doneCurrentPage: 0,
    };
  }

  componentDidUpdate(prevState) {
    if (this.state.display !== prevState.display) {
      this.getWrapperStyle("wrapper-1")
      this.getWrapperStyle("wrapper-2")
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
    e.style.display = d;
  }

  toggleDisplay = (subheaderId) => {
    const m = new Map(this.state.display)
    const id = subheaderId.slice(-1, subheaderId.length);
    const d = m.get(Number(id))[0];
    const b = m.get(Number(id))[1];
    
    m.set(Number(id), d === "block" && b === false ? ["none", !b] : ["block", !b]);

    this.setState({ display: m })
  }

  // figure out why page count is stuck at 1
  // it works if you give it a higher int.
  handleNotDonePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.props.getPaginationLimit(false);

    this.props.setOffset(false, offset);
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
    this.setState({
        doneCurrentPage: selectedPage,
    }, () => {
        this.props.getTasks(true)
    });

  };

  render() {
    return (
      <div style={this.getFlexContainerStyle()}>
        <div style={{ width: "50%" }}>
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
              activeClassName={"active"}/>
          </div>
        </div>
        <div style={{ width: "50%" }}>
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
              activeClassName={"active"}/>
          </div>
        </div>
      </div>
    );
  }
}

export default TodoContainer;

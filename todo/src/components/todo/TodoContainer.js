import React, { Component } from "react";
import TodoItem from "./TodoItem";
import Subheader from "./Subheader";

class TodoContainer extends Component {
  constructor(props) {
    super(props);

    const map = new Map();
    map.set(1, ["92%", false])
    map.set(2, ["92%", false])

    this.state = {
      todos: [],
      display: map,
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

  render() {
    return (
      <div style={this.getFlexContainerStyle()}>
        <div style={{ width: "50%", padding: "24px", margin: "24px" }}>
          <Subheader  
            id={"sub-1"}
            name="To Do"
            toggleDisplay={this.toggleDisplay}
            up={this.state.display.get(1)[1]}
            palette={this.props.palette}
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
                  palette={this.props.palette}
                />
              );
            })}
          </div>
        </div>
        <div style={{ width: "50%", padding: "24px", margin: "24px" }}>
          <Subheader  
            id="sub-2"
            name="Done" 
            toggleDisplay={this.toggleDisplay}
            up={this.state.display.get(2)[1]}
            palette={this.props.palette}
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
                  palette={this.props.palette}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default TodoContainer;

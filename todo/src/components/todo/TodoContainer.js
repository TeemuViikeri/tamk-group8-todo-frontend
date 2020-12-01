import React, { Component } from "react";
import TodoItem from "./TodoItem";
import Subheader from "./Subheader";

class TodoContainer extends Component {
  constructor(props) {
    super(props);

    const map = new Map();
    map.set(1, "block")
    map.set(2, "block")

    this.state = {
      todos: [],
      show: map
    };
  }

  componentDidUpdate(prevState) {
    if (this.state.show !== prevState.show) {
      this.getWrapperStyle("wrapper-1")
      this.getWrapperStyle("wrapper-2")
    }

  }

  getFlexContainerStyle = () => {
    return {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-evenly"
    }
  }

  getWrapperStyle = (wrapperId) => {    
    const e = document.getElementById(wrapperId);
    const id = wrapperId.slice(-1, wrapperId.length); 
    const d = this.state.show.get(Number(id));
    e.style.display = d;
  }

  toggleShow = (subheaderId) => {
    const m = new Map(this.state.show)
    const id = subheaderId.slice(-1, subheaderId.length);
    const d = m.get(Number(id));
    m.set(Number(id), d === "block" ? "none" : "block");
    
    this.setState({ show: m })
  }

  render() {
    return (
      <div style={this.getFlexContainerStyle()}>
        <div style={{ width: "50%" }}>
          <Subheader  
            id={"sub-1"}
            name="To Do"
            toggleShow={this.toggleShow}
          />
          <div id="wrapper-1">
            {this.props.todos.map((todo) => {
              return (
                <TodoItem
                  key={todo.id} 
                  todo={todo}
                  toggleTodo={this.props.toggleTodo}
                  deleteTodo={this.props.deleteTodo}
                  checked={todo.is_done}
                />
              );
            })}
          </div>
        </div>
        <div style={{ width: "50%" }}>
          <Subheader  
            id="2"
            name="Done" 
            toggleShow={this.toggleShow}
          />
          <div id="wrapper-2">
            {this.props.doneTodos.map((todo) => {
              return (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  toggleTodo={this.props.toggleTodo}
                  deleteTodo={this.props.deleteTodo}
                  checked={todo.is_done}
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

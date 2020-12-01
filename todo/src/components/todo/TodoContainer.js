import React, { Component } from "react";
import TodoItem from "./TodoItem";
import Subheader from "./Subheader";

class TodoContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
    };
  }

  getFlexContainerStyle = () => {
    return {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-evenly"
    }
  }

  render() {
    return (
      <div style={this.getFlexContainerStyle()}>
        <div style={{ width: "50%" }}>
          <Subheader name={"To Do"} />
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
        <div style={{ width: "50%" }}>
          <Subheader name={"Done"} />
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
    );
  }
}

export default TodoContainer;

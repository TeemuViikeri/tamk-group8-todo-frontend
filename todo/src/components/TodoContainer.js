import React, { Component } from "react";
import TodoItem from "./TodoItem";
import axios from "axios";

class TodoContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      insertId: null,
    };
  }

  render() {
    return (
      <div>
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
    );
  }
}

export default TodoContainer;

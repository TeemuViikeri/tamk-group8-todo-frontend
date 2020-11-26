import React, { Component } from "react";
import SubmitButton from "../SubmitButton";
import TextInput from "./TextInput";

class TextInputField extends Component {
  state = {
    listId: 1,
    title: "",
  };

  onSubmit = (e) => {
    if (this.state.title === "") {
      return;
    }

    e.preventDefault();

    this.props.addTodo(this.state.listId, this.state.title);
    this.setState({ title: "" });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit} style={{ display: "flex", height: "65px", }}>
        <TextInput title={this.state.title} onChange={this.onChange} />
        <SubmitButton />
      </form>
    );
  }
}

export default TextInputField;

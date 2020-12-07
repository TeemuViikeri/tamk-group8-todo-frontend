import React, { Component } from "react";
import SubmitButton from "../SubmitButton";
import ListInput from "./ListInput";

class ListInputField extends Component {
  constructor() {
    super();
    this.state = {
      listName: "",
    };
  }

  onSubmit = (e) => {
    if (this.state.listName === "") {
      return;
    }

    e.preventDefault();

    this.props.addList(this.state.listName);
    this.setState({ title: "" });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit} style={{ display: "flex", height: "65px", width: "100%" }}>
        <ListInput title={this.state.listName} onChange={this.onChange} flexInput="3"/>
        <SubmitButton text="Add" borderRadiusSubmit="12px" flexBtn="2" />
      </form>
    );
  }
}

export default ListInputField;

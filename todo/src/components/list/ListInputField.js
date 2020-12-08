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
        <ListInput title={this.state.listName} onChange={this.onChange} borderRadiusInput="12px 0 0 12px" flexInput="4.5" marginInput="15px 0 15px 20px" />
        <SubmitButton text="Add" borderRadiusSubmit="0 12px 12px 0" flexBtn="1" marginSubmit="15px 20px 15px 0" bgColorSubmit="gainsboro"
      />
      </form>
    );
  }
}

export default ListInputField;

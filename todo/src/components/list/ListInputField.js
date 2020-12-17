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
    e.preventDefault();

    if (this.state.listName === "") {
      return;
    }

    this.props.addList(this.state.listName);
    this.setState({ title: "" });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <form 
        onSubmit={this.onSubmit} 
        style={{ 
          display: "flex", 
          flexDirection: "row", 
          height: "4.0625rem", 
          alignItems: "center",
          width: "100%",
          margin: "0 auto"
        }}
      >
        <ListInput 
          title={this.state.listName} 
          onChange={this.onChange}
          textColorInput={this.props.palette.fillTextColor}
          bgColorInput={this.props.palette.fillInputColor}
          flexInput="4.5" 
          paddingInput="0.625rem"
          marginInput="0.9375rem 0 0.9375rem 1.25rem" 
          borderRadiusInput="0.75rem 0 0 0.75rem" 
        />
        <SubmitButton 
          text="Add" 
          flexBtn="1" 
          bgColorSubmit={this.props.palette.fillButton}
          textColorSubmit={this.props.palette.fillTextColor}
          paddingSubmit="0.625rem"
          marginSubmit="0.9375rem 1.25rem 0.9375rem 0" 
          borderRadiusSubmit="0 0.75rem 0.75rem 0" 
        />
      </form>
    );
  }
}

export default ListInputField;

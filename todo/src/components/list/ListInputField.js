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
          height: "65px", 
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
          paddingInput="10px"
          marginInput="15px 0 15px 20px" 
          borderRadiusInput="12px 0 0 12px" 
        />
        <SubmitButton 
          text="Add" 
          flexBtn="1" 
          bgColorSubmit={this.props.palette.fillButton}
          textColorSubmit={this.props.palette.fillTextColor}
          paddingSubmit="10px"
          marginSubmit="15px 20px 15px 0" 
          borderRadiusSubmit="0 12px 12px 0" 
      />
      </form>
    );
  }
}

export default ListInputField;

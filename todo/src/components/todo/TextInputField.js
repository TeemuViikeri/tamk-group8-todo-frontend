import React, { Component } from "react";
import SubmitButton from "../SubmitButton";
import TextInput from "./TextInput";

class TextInputField extends Component {
  constructor() {
    super();
    this.state = {
      listId: 1,
      title: "",
    };
  }

  onSubmit = (e) => {   
    e.preventDefault();

    if (this.state.title === "") {
      this.props.finishEditing()
      return
    }
    
    if (this.props.addTodo !== undefined) {
      this.props.addTodo(this.props.currentList, this.state.title);
      this.setState({ title: "" });
    } else {
      this.props.editTodo(this.props.editId, this.state.title)
      this.setState({ title: "" });
      this.props.finishEditing();
    }
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <form 
        onSubmit={this.onSubmit} 
        style={{ display: "flex", height: "65px", flexDirection: "row" }}
      >
        <TextInput 
          title={this.state.title} 
          onChange={this.onChange} 
          flexInput={this.props.flexInput}
          padding={this.props.padding}
          margin="15px 20px"
          placeholder={this.props.placeholder}
          borderBottom={this.props.borderBottom}
          borderRadiusInput={this.props.borderRadiusInput}
          bgColorInput={this.props.bgColorInput}
          width={this.props.width}
        />
        <SubmitButton 
          padding={this.props.padding}
          flexBtn={this.props.flexBtn}
          text={this.props.btnText} 
          borderRadiusSubmit={this.props.borderRadiusSubmit}
          bgColorSubmit={this.props.bgColorSubmit}
          textColorSubmit={this.props.textColorSubmit}
        />
      </form>
    );
  }
}

export default TextInputField;

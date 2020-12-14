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
    
    if (this.props.addTodo !== undefined ) {
      if (this.state.title === "") {
        return
      }
      
      this.props.addTodo(this.props.currentList, this.state.title);
      this.setState({ title: "" });
    }
    
    if (this.props.editTodo !== undefined) {
      if (this.state.title === "") {
        this.props.finishEditing();
        return
      }

      this.props.editTodo(this.props.editId, this.state.title)
      this.setState({ title: "" });
      this.props.finishEditing();
    }

    if (this.props.editList !== undefined) {
      console.log("here");
      this.props.editList(this.props.editId, this.state.title)
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
        style={{ display: "flex", flexDirection: "row", alignItems: "center", height: this.props.height, width: this.props.width }}
      >
        <TextInput 
          title={this.state.title} 
          onChange={this.onChange} 
          flexInput={this.props.flexInput}
          paddingInput={this.props.paddingInput}
          marginInput={this.props.marginInput}
          placeholder={this.props.placeholder}
          borderBottom={this.props.borderBottom}
          borderRadiusInput={this.props.borderRadiusInput}
          bgColorInput={this.props.bgColorInput}
          width={this.props.width}
          heightInput={this.props.heightInput}
          />
        <SubmitButton 
          heightSubmit={this.props.heightSubmit}
          paddingSubmit={this.props.paddingSubmit}
          marginSubmit={this.props.marginSubmit}
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

import React, { Component } from "react";

class ListInput extends Component {
  getListInputStyle = () => {
    return {
      padding: "10px",
      margin: this.props.marginInput,
      border: "none",
      borderRadius: this.props.borderRadiusInput,
      color: this.props.textColorInput,
      backgroundColor: this.props.bgColorInput,
      flex: this.props.flexInput
    };
  };

  render() {
    return (
      <input
        type="text"
        name="listName"
        style={this.getListInputStyle()}
        placeholder="Create a list"
        value={this.props.listName}
        onChange={this.props.onChange}
      />
    );
  }
}

export default ListInput;

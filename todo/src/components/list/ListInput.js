import React, { Component } from "react";

class ListInput extends Component {
  getListInputStyle = () => {
    return {
      padding: "10px",
      margin: "15px 20px",
      border: "none",
      borderRadius: "12px",
      color: "black",
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

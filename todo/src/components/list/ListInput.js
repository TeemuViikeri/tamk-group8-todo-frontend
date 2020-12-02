import React, { Component } from "react";

class ListInput extends Component {
  getListInputStyle = () => {
    return {
      padding: "10px",
      margin: "15px 20px",
      boxShadow: "0px -0px 1px 4px rgba(255, 255, 255, .2)",
      border: "none",
      borderRadius: "12px",
      color: "black",
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

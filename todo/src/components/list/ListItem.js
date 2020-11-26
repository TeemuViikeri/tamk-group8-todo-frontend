import React, { Component } from "react";

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnStyle: { display: "none" },
    };
  }

  getCheckboxStyle = () => {
    return {
      width: "1.3em",
      height: "1.3em",
      backgroundColor: "white",
      borderRadius: "50%",
      verticalAlign: "-0.3em",
      border: "1px solid #ddd",
      outline: "none",
      cursor: "pointer",
    };
  };

  getItemStyle = () => {
    return {
      padding: "15px 20px",
      textAlign: "left",
      color: "#333",
      fontWeight: "600",
    };
  };

  getButtonStyle = () => {
    return {
      cursor: "pointer",
      background: "none",
      border: "none",
      fontWeight: "bold",
      padding: "2px",
      color: "black",
      verticalAlign: "0.05rem",
      display: this.state.btnStyle.display,
    };
  };

  render() {
    const { id, name } = this.props.list;
    return (
      <div
        onMouseEnter={(e) => {
          this.setState({ btnStyle: { display: "inline-block" } });
        }}
        onMouseLeave={(e) => {
          this.setState({ btnStyle: { display: "none" } });
        }}
        style={this.getItemStyle()}
      >
        {name}
        <button
          onClick={this.props.deleteList.bind(this, id)}
          style={this.getButtonStyle()}
        >
          x
        </button>
      </div>
    );
  }
}

export default TodoItem;

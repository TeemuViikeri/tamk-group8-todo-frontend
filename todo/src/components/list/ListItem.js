import React, { Component } from "react";

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnStyle: { display: "none" },
    };
  }

  getItemStyle = () => {
    return {
      padding: "7px 7px",
      fontSize: "1em",
      marginLeft: "1%",
      marginRight: "1%",
      textAlign: "left",
      color: "#333",
      fontWeight: "600",
      borderRadius: "15px",
      width: "93%",
      cursor: "pointer",
    };
  };

  getButtonStyle = () => {
    return {
      cursor: "pointer",
      width: "5%",
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
        <button
        onClick={this.props.setList.bind(this, id)}
        style={this.getItemStyle()}
        >
          {name}
        </button>

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

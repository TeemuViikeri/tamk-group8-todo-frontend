import React, { Component } from "react";

class SideMenuButton extends Component {
  constructor() {
    super();

    this.state = {
      menuIsOpen: false,
    };
  }

  getStyle = () => {
    return {
      display: "inline-block",
      marginRight: "16px",
      cursor: "pointer",
    };
  };

  render() {
    return <div style={this.getStyle()}>&#9776;</div>;
  }
}

export default SideMenuButton;

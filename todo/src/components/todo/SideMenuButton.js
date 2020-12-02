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
      flex: "3",
      display: "inline-block",
      cursor: "pointer",
      fontSize: "32px"
    };
  };

  render() {
    return <div style={this.getStyle()}>&#9776;</div>;
  }
}

export default SideMenuButton;

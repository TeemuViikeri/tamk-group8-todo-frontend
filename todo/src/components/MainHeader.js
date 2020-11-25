import React, { Component } from "react";
import SideMenuButton from "./SideMenuButton";

class MainHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      header: props,
    };
  }

  getH1Style = () => {
    return {
      height: "72px",
      color: "white",
      background: "#cc5252",
      padding: "15px 20px",
      textAlign: "left",
    };
  };

  render() {
    return (
      <h1 style={this.getH1Style()}>
        <SideMenuButton />
        Todo List
      </h1>
    );
  }
}

export default MainHeader;

import React, { Component } from "react";
import SideMenuButton from "./SideMenuButton";

class MainHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.name,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.name !== this.props.name) {
      this.setState({ name: this.props.name })
    }
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
        {this.state.name}
      </h1>
    );
  }
}

export default MainHeader;

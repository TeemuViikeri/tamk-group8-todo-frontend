import React, {Component} from "react";

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
    return <h1 style={this.getH1Style()}>Todo List</h1>;
  }
}

export default MainHeader;

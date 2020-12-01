import React, { Component } from "react";
import Caret from "./Caret";
import { v4 as uuid } from 'uuid';


class Subheader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.name,
    };
  }

  getH2Style = () => {
    return {
      color: "#cc5252",
      padding: "15px 20px 0 20px",
      textAlign: "left",
    };
  };

  render() {
    return (
      <h2 style={this.getH2Style()}>
        {this.state.name}
        <Caret id={ uuid() } />
      </h2>
    );
  }
}

export default Subheader;

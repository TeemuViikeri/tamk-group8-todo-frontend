import React, { Component } from "react";
import Caret from "./Caret";


class Subheader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.name,
    };
  }

  getH2Style = () => {
    return {
      color: this.props.palette.fillHeaderColor,
      backgroundColor: this.props.palette.primary,
      padding: "15px 20px 15px 20px",
      textAlign: "left",
    };
  };

  render() {
    return (
      <h2 style={this.getH2Style()}>
        {this.state.name}
        <Caret 
          id={this.props.id}
          toggleDisplay={this.props.toggleDisplay}  
          up={this.props.up}
          palette={this.props.palette}
        />
      </h2>
    );
  }
}

export default Subheader;

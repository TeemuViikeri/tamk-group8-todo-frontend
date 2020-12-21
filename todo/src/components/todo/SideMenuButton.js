import React, { Component } from "react";

class SideMenuButton extends Component {
  getStyle = () => {
    return {
      flex: this.props.flex,
      display: "inline-block",
      cursor: "pointer",
      fontSize: "2rem"
    };
  };

  render() {
    return (
      <div 
        style={this.getStyle()}
        onClick={ this.props.openSideMenu }
      >
        &#9776;
      </div>
    )
  }
}

export default SideMenuButton;

import React, { Component } from "react";

class SideMenuButton extends Component {  
  render() {
    return (
      <div 
        style={{
          flex: this.props.flex,
          display: "inline-block",
          fontSize: "2rem"
        }}
      >
        <span
          onClick={ this.props.openSideMenu }
          style={{ cursor: "pointer" }}
        >
          &#9776;
        </span>
      </div>
    )
  }
}

export default SideMenuButton;

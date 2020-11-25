import React, { Component } from "react";

class SideMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMobileView: false,
    };
  }

  getSideMenuStyle = () => {
    return {
      color: "white",
      flex: "1 1 auto",
      backgroundColor: "gainsboro",
      maxWidth: "20%",
      height: "100%",
    };
  };

  getSideMenuHeaderStyle = () => {
    return {
      textAlign: "left",
      padding: "15px 20px",
      backgroundColor: "#962029",
      lineHeight: "43px",
      height: "72px",
    };
  };

  getSideMenuFooterStyle = () => {
    return {
      textAlign: "left",
      padding: "15px 20px",
      backgroundColor: "#962029",
      lineHeight: "35px",
      position: "absolute",
      bottom: "0",
      width: "20%",
      height: "65px",
    };
  };

  render() {
    return (
      <div style={this.getSideMenuStyle()}>
        <h3 style={this.getSideMenuHeaderStyle()}>Side Menu</h3>
        <p></p>
        <div style={this.getSideMenuFooterStyle()}>
        </div>
      </div>
    );
  }
}

export default SideMenu;

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
      flex: this.props.flex,
      display: "inline-block",
      cursor: "pointer",
      fontSize: "32px"
    };
  };

  handleClickEvent = async () => {
    await this.setState({ menuIsOpen: !this.state.menuIsOpen}, () => console.log(this.state.menuIsOpen))
    this.state.menuIsOpen
    ? this.props.closeSideMenu()
    : this.props.openSideMenu()
  }

  render() {
    return (
      <div 
        style={this.getStyle()}
        onClick={ this.handleClickEvent }
      >
        &#9776;
      </div>
    )
  }
}

export default SideMenuButton;

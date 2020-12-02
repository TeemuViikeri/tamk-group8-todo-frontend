import React, { Component } from "react";
import ListItem from "./ListItem";
import ListInputField from "./ListInputField";

class SideMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lists: [],
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
        <h1 style={this.getSideMenuHeaderStyle()}>Lists</h1>

        <div>
          {this.props.lists.map((list) => {
            return (
              <ListItem
                key={list.id}
                list={list}
                deleteList={this.props.deleteList}
                setList={this.props.setList}
              />
            );
          })}
        </div>

        <div style={this.getSideMenuFooterStyle()}>
          <ListInputField addList={this.props.addList} />
        </div>
      </div>
    );
  }
}

export default SideMenu;

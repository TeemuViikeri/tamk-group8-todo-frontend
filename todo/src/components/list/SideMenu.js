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
      width: "0px",
      flex: "auto 0 auto",
      display: "flex",
      flexDirection: "column",
      backgroundColor: this.props.palette.bgSecondary, 
      height: "100vh",
    };
  };

  getSideMenuHeaderStyle = () => {
    return {
      textAlign: "left",
      padding: "15px 20px",
      backgroundColor: this.props.palette.secondary,
      lineHeight: "43px",
      height: "72px",
      flex: "1",
      marginBottom: "15px",
      color: this.props.palette.fillHeaderColor
    };
  };

  getSideMenuFooterStyle = () => {
    return {
      display: "flex",
      backgroundColor: this.props.palette.secondary,
      lineHeight: "35px",
      height: "65px",
      flex: "0 1 auto",
      justifyContent: "center"
    };
  };

  render() {
    return (
      <div id="sideMenu" style={this.getSideMenuStyle()}>
        <h1 style={this.getSideMenuHeaderStyle()}>Lists</h1>

        <div style={{flex: "21"}}>
          {this.props.lists.map((list) => {
            return (
              <ListItem
                id={list.id}
                key={list.id}
                list={list}
                deleteList={this.props.deleteList}
                setList={this.props.setList}
                editList={this.props.editList}
                currentList={this.props.currentList}
                palette={this.props.palette}
              />
            );
          })}
        </div>

        <div style={this.getSideMenuFooterStyle()}>
          <ListInputField addList={this.props.addList} palette={this.props.palette} />
        </div>
      </div>
    );
  }
}

export default SideMenu;

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
      height: "100%",
      flex: "initial",
      display: "flex",
      flexDirection: "column",
      backgroundColor: this.props.palette.bgSecondary, 
    };
  };

  getSideMenuHeaderStyle = () => {
    return {
      textAlign: "left",
      padding: "15px 20px",
      backgroundColor: this.props.palette.secondary,
      height: "72px",
      color: this.props.palette.fillHeaderColor
    };
  };

  getSideMenuFooterStyle = () => {
    return {
      backgroundColor: this.props.palette.secondary,
      lineHeight: "35px",
      height: "65px",
      width: "100%",
    };
  };

  render() {
    return (
      <div id="sideMenu" style={this.getSideMenuStyle()}>
        <h1 style={this.getSideMenuHeaderStyle()}>Lists</h1>

        <div style={{ marginTop: "15px", minHeight: 0, flexGrow: "1"}}>
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

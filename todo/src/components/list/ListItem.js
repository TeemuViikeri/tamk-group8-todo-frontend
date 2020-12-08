import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { confirmAlert } from 'react-confirm-alert'; // Import
import './react-confirm-alert.css'; // Import css

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnStyle: { display: "none" },
    };
  }

  getItemStyle = () => {
    return {
      padding: "8px 20px",
      fontSize: "1em",
      margin: "1% 1% 1% 0",
      textAlign: "left",
      color: this.props.currentList === this.props.id ? "white" : "#333",
      fontStyle: this.props.currentList === this.props.id ? "italic" : "normal",
      fontWeight: "600",
      borderRadius: "0 15px 15px 0",
      borderTop: "1px solid rgba(0, 0, 0, 0.3)",
      borderRight: "1px solid rgba(0, 0, 0, 0.3)",
      borderBottom: "1px solid rgba(0, 0, 0, 0.3)",
      borderLeft: "none",
      width: "90%",
      cursor: "pointer",
      backgroundColor: this.props.currentList === this.props.id ? "#cc5252" : "white"
    };
  };

  getButtonStyle = () => {
    return {
      cursor: "pointer",
      width: "5%",
      background: "none",
      border: "none",
      fontWeight: "bold",
      padding: "2px",
      color: this.props.currentList === this.props.id ? "white" : "black",
      verticalAlign: "0.05rem",
      display: this.state.btnStyle.display,
      zIndex: "1",
      float: "right",
      position: "relative",
      top: "2px"
    };
  };

  submit = (e, id) => {
    confirmAlert({
      title: `Are you sure you want to delete list ${this.props.list.name}?`,
      message: "This action cannot be undone.",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.props.deleteList(id)
        },
        {
          label: "No",
          onClick: () => console.log("Delete alert rejected.")
        }
      ]
    });
    // Stops onClick event from bubbling to parent event's onClick event
    e.stopPropagation()
  };

  render() {
    const { id, name } = this.props.list;
    return (
      <div
        onMouseEnter={(e) => {
          this.setState({ btnStyle: { display: "inline-block" } });
        }}
        onMouseLeave={(e) => {
          this.setState({ btnStyle: { display: "none" } });
        }}
      >
        <div
          onClick={this.props.setList.bind(this, id)}
          style={this.getItemStyle()}
        >
          {name}
          <button
            onClick={e => this.submit(e, id)}
            style={this.getButtonStyle()}
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </div>

      </div>
    );
  }
}

export default TodoItem;

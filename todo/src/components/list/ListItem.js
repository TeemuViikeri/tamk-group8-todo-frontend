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
      padding: "7px 7px",
      fontSize: "1em",
      marginLeft: "1%",
      marginRight: "1%",
      textAlign: "left",
      color: "#333",
      fontWeight: "600",
      borderRadius: "15px",
      width: "93%",
      cursor: "pointer",
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
      color: "black",
      verticalAlign: "0.05rem",
      display: this.state.btnStyle.display,
    };
  };

  submit = (id) => {
    confirmAlert({
      title: `Are you sure to delete ${this.props.list.name}?`,
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
        style={this.getItemStyle()}
      >
        <button
        onClick={this.props.setList.bind(this, id)}
        style={this.getItemStyle()}
        >
          {name}
        </button>

        <button
          onClick={() => this.submit(id)}
          style={this.getButtonStyle()}
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      </div>
    );
  }
}

export default TodoItem;

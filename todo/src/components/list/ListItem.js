import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { confirmAlert } from 'react-confirm-alert'; // Import
import '../react-confirm-alert.css'; // Import css
import TextInputField from '../todo/TextInputField'

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnStyle: { display: "none" },
      isEditing: false
    };
  }

  getItemStyle = () => {
    return {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0.5rem 1.25rem",
      fontSize: "1em",
      margin: "1% 1% 1% 0",
      textAlign: "left",
      color: this.props.currentList === this.props.id ? this.props.palette.fillActiveTextColor : this.props.palette.fillTextColor,
      fontStyle: this.props.currentList === this.props.id ? "italic" : "normal",
      fontWeight: "600",
      borderRadius: "0 0.9375rem 0.9375rem 0",
      borderTop: "0.0625rem solid rgba(0, 0, 0, 0.3)",
      borderRight: "0.0625rem solid rgba(0, 0, 0, 0.3)",
      borderBottom: "0.0625rem solid rgba(0, 0, 0, 0.3)",
      borderLeft: "none",
      width: "90%",
      cursor: "pointer",
      backgroundColor: this.props.currentList === this.props.id ? this.props.palette.fillActiveList : this.props.palette.fillList
    };
  };

  getButtonStyle = () => {
    return {
      cursor: "pointer",
      width: "5%",
      background: "none",
      border: "none",
      fontWeight: "bold",
      padding: "0.125rem",
      color: this.props.currentList === this.props.id ? this.props.palette.fillActiveTextColor : this.props.palette.fillTextColor,
      display: this.state.btnStyle.display,
      zIndex: "1",
      float: "right",
    };
  };

  handleEditEvent = () => {
    this.setState({ isEditing: true })
  }

  finishEditing = () => {
    this.setState({ isEditing: false })
  }

  // Stop title from overflowing the confirmAlert for the priority slider.
  getDialogTitle = title => {
    if (title.length > 20) {
      title = title.substring(0, 18) + "...";
    }

    return title;
  }

  submit = (e, id) => {
    confirmAlert({
      title: `Are you sure you want to delete list ${this.getDialogTitle(this.props.list.name)}?`,
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
      // If state property isEditing is false...
      !this.state.isEditing ?
      // Render normal list item
      <div
        onMouseEnter={(e) => {
          this.setState({ btnStyle: { display: "inline-block" } });
        }}
        onMouseLeave={(e) => {
          this.setState({ btnStyle: { display: "none" } });
        }}
        onClick={this.props.setList.bind(this, id)}
        style={this.getItemStyle()}
      >
        <div style={{ textOverflow: "ellipsis", overflow: "hidden" }}>{name}</div>
        <span style={{
            display: "flex", 
            flexDirection: "row", 
            justifyContent: "space-around"
          }}
        >
          <button
            onClick={() => this.handleEditEvent()}
            style={this.getButtonStyle()}
            >
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button
            onClick={e => this.submit(e, id)}
            style={this.getButtonStyle()}
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </span>
      </div>
      : // Otherwise...
      <TextInputField 
        btnText="Edit" 
        editList={this.props.editList}
        bgColorSubmit={this.props.palette.primary}
        textColorSubmit={this.props.palette.fillActiveTextColor}
        placeholder={name}
        editId={id}
        finishEditing={this.finishEditing}
        flexInput="10"
        flexBtn="1"
        height="2.4375rem"
        width="90%"
        heightInput="2.4375rem"
        heightSubmit="2.4375rem"
        paddingInput="0.5rem 1.25rem"
        paddingSubmit="0.5rem 1.25rem"
        marginInput="1% 0 1% 0"
        marginSubmit="1% 0 1% 0"
        borderBottom="0.0625rem solid #999"
        borderRadiusInput= "0"
        borderRadiusSubmit= "0 1rem 1rem 0"
      />
    );
  }
}

export default TodoItem;

import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faEraser, 
  faEdit, 
  faCalendarAlt, 
  faWeightHanging 
  } from '@fortawesome/free-solid-svg-icons'
import DateMenu from "./DateMenu"
import TextInputField from "./TextInputField";
import { confirmAlert } from 'react-confirm-alert';
import '../react-confirm-alert.css';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';


class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnStyle: { display: "none" },
      checked: false,
      isEditing: false,
      isDateEditing: false,
      tester: 3,
    };
  }

  getCheckboxStyle = () => {
    return {
      width: "1.3em",
      height: "1.3em",
      backgroundColor: "white",
      borderRadius: "50%",
      verticalAlign: "-0.3em",
      border: "1px solid #ddd",
      outline: "none",
      cursor: "pointer",
      transform: this.state.checked ? "scale(0.5)" : "scale(1)",
      transition: "transform 100ms",
    };
  };

  getItemStyle = () => {
    return {
      padding: "15px 20px",
      textAlign: "left",
      color: "#333",
      fontWeight: "600",
      textDecoration: this.props.todo.is_done ? "line-through" : "none",
    };
  };

  getButtonStyle = () => {
    return {
      cursor: "pointer",
      background: "none",
      border: "none",
      fontWeight: "bold",
      padding: "2px",
      color: "black",
      verticalAlign: "0.05rem",
      display: this.state.btnStyle.display,
    };
  };

  finishEditing = () => {
    this.setState({ isEditing: false })
  }

  stopDateEditing = (newDeadline) => {
    this.setState({ isDateEditing: false})
    this.props.setTodoDeadline(this.props.todo.id, newDeadline)
  }

  startDateEditing = () => {
    this.setState({ isDateEditing: true })
  }

  handleEditEvent = () => {
    this.setState({ isEditing: true })
  }

  setPriorityDialog = () => {
    confirmAlert({
      title: `Give ${this.props.todo.title} a priority.`,
      message: <Slider 
                  min={1} 
                  max={33965} 
                  defaultValue={33960} 
                  marks={{ 1: "Low", 2: "", 3: "Medium", 4: "", 5: "High" }}
                  
                  />,
      buttons: [
        {
          label: "Set",
          onClick: () => console.log(document.getElementsByClassName("react-confirm-alert-body"))
        },
        {
          label: "Cancel",
          onClick: () => console.log("Priority change canceled.")
        }
      ]
    });
    console.log(document.getElementsByClassName("react-confirm-alert-body"))
  };


  render() {
    const { id, title } = this.props.todo;
    return (
      // If state property isEditing is false...
      !this.state.isEditing ?
      // Render normal to do task
      <div
        onMouseEnter={(e) => {
          this.setState({ btnStyle: { display: "inline-block" } });
        }}
        onMouseLeave={(e) => {
          this.setState({ btnStyle: { display: "none" } });
        }}
        style={this.getItemStyle()}
      >
        <span>
          <input
            type="checkbox"
            onChange={this.props.toggleTodo.bind(this, id, !this.props.checked)}
            style={this.getCheckboxStyle()}
            checked={this.props.checked}
          />
          <label htmlFor="checkbox"></label> {title}{" "}
          <button
            onClick={() => this.handleEditEvent()}
            style={this.getButtonStyle()}
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button
            onClick={() => this.startDateEditing()}
            style={this.getButtonStyle()}
          >
            <FontAwesomeIcon icon={faCalendarAlt} />
          </button>
          <button
            onClick={() => this.setPriorityDialog()}
            style={this.getButtonStyle()}
          >
            <FontAwesomeIcon icon={faWeightHanging} />
          </button>
          <button
            onClick={this.props.deleteTodo.bind(this, id, this.props.checked)}
            style={this.getButtonStyle()}
          >
            <FontAwesomeIcon icon={faEraser} />
          </button>
          <DateMenu 
            stopDateEditing={this.stopDateEditing}
            todoId={id}
            deadline={this.props.todo.deadline}
            isDateEditing={this.state.isDateEditing}
            getButtonStyle={this.getButtonStyle}
            setTodoDeadlineNull={this.props.setTodoDeadlineNull}
          />
        </span>
      </div>
      : // Otherwise...
      <TextInputField 
        btnText="Edit" 
        borderBottom="1px solid #999"
        editTodo={this.props.editTodo}
        bindObj={this}
        bgColorSubmit="#cc5252"
        textColorSubmit="white"
        placeholder={title}
        editId={id}
        finishEditing={this.finishEditing}
        padding="10px"
        marginInput="15px 20px"
        marginSubmit="15px 0"
      />
    );
  }
}

export default TodoItem;

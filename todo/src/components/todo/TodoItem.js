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
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnStyle: { display: "none" },
      checked: false,
      isEditing: false,
      isDateEditing: false,
      tempPriority: 3,
      sliderColor: this.props.palette.primary,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.palette.primary !== prevProps.palette.primary) {
      this.setState({ sliderColor: this.props.palette.primary })
    }
  }

  getItemStyle = () => {
    return {
      padding: "0.9375rem 1.25rem",
      marginBottom: "0.5rem",
      textAlign: "left",
      color: this.props.palette.fillTextColor,
      fontWeight: "600",
      backgroundColor: this.props.palette.fillTask,
      whiteSpace: "pre-wrap",
    };
  };

  getButtonStyle = () => {
    return {
      cursor: "pointer",
      background: "none",
      border: "none",
      fontWeight: "bold",
      padding: "0.125rem",
      color: this.props.palette.fillTextColor,
      verticalAlign: "0.05rem",
      display: this.state.btnStyle.display,
    };
  };

  finishEditing = () => {
    this.setState({ isEditing: false })
  }

  stopDateEditing = (newDeadline) => {
    this.setState({ isDateEditing: false})
    
    if (newDeadline !== undefined) {
      this.props.setTodoDeadline(this.props.todo.id, newDeadline)
    }
  }

  startDateEditing = () => {
    this.setState({ isDateEditing: true })
  }

  handleEditEvent = () => {
    this.setState({ isEditing: true })
  }

  handleValueChange = async tempPriority => {
    await this.setState({ tempPriority })
  }

  // Stop title from overflowing the confirmAlert for the priority slider.
  getDialogTitle = title => {
    if (title.length > 20) {
      title = title.substring(0, 18) + "...";
    }

    return title;
  }

  // Create a confirmation alert with the message being replaced by rc-slider.
  // Set button sets the new todo priority by reading from the elements due to
  // react-confirm-alert and rc-slider having issues with each other.
  setPriorityDialog = () => {
    confirmAlert({
      title: `Give "${this.getDialogTitle(this.props.todo.title)}" a priority.`,
      // Yes, this gives a console error because the message isn't a string
      // No, we can't fix it.
      message: <Slider 
                  min={1} 
                  max={5} 
                  defaultValue={this.props.todo.priority} 
                  marks={{ 1: "Low", 2: "", 3: "Medium", 4: "", 5: "High" }}
                  onChange={this.handleValueChange}
                  handleStyle={{border: `solid 0.125rem ${this.state.sliderColor}`}}
                  trackStyle={{backgroundColor: this.state.sliderColor}}
                  activeDotStyle={{border: `solid 0.125rem ${this.state.sliderColor}`}}
                />,
      buttons: [
        {
          label: "Set",
          onClick: () => this.props.setTodoPriority(
            this.props.todo.id, 
            // confirmAlert won't play nice with rc-slider 
            // so we have to use this abomination.
            document.getElementsByClassName("rc-slider-handle")[0].getAttribute("aria-valuenow"))
        },
        {
          label: "Cancel",
          onClick: () => console.log("Priority change canceled.")
        }
      ]
    });
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
        <input
          type="checkbox"
          id={`checkbox-${id}`}
          className="css-checkbox"
          onChange={this.props.toggleTodo.bind(this, id, !this.props.checked)}
          checked={this.props.checked}
        />
        <label 
          htmlFor={`checkbox-${id}`} 
          style={
            this.props.checked
            ? { backgroundColor: this.props.palette.primary, border: "none", padding: "0.5625rem" }
            : { backgroundColor: this.props.palette.primaryBg, borderWidth: "0.125rem", borderStyle: "solid", borderColor: this.props.palette.primary, padding: "0.4375rem" }
          } 
        />
        {" "}
        <span 
          style={{ 
            textDecoration: this.props.todo.is_done ? "line-through" : "none",
            textDecorationSkip: "spaces",
            overflowWrap: "break-word"
          }}
        >
          {title}
        </span>
        {" "}
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
          palette={this.props.palette}
          stopDateEditing={this.stopDateEditing}
          todoId={id}
          deadline={this.props.todo.deadline}
          isDateEditing={this.state.isDateEditing}
          getButtonStyle={this.getButtonStyle}
          setTodoDeadlineNull={this.props.setTodoDeadlineNull}
        />
      </div>
      : // Otherwise...
      <TextInputField 
        editId={id}
        placeholder={title}
        editTodo={this.props.editTodo}
        finishEditing={this.finishEditing}
        btnText="Edit" 
        bgColorSubmit={this.props.palette.fillEditBg}
        textColorSubmit={this.props.palette.fillEditText}
        height="4.0625rem"
        paddingInput="0.625rem"
        paddingSubmit="0.625rem"
        marginInput="0.9375rem 1.25rem"
        marginSubmit="0.9375rem 0"
        borderBottom="0.0625rem solid #999"
      />
    );
  }
}

export default TodoItem;

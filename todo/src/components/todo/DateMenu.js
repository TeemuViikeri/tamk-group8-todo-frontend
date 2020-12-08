import React, { Component } from "react";
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEraser } from '@fortawesome/free-solid-svg-icons'

class DateMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dateDisplay: new Date(),
    };
  }
  
  componentDidUpdate(prevState) {
    if (this.props.deadline !== prevState.deadline) {
      this.setState({ dateDisplay: new Date(this.props.deadline) }, () => console.log(this.state.dateDisplay))
    }
  }

  dateAssembler = () => {
    if (!isNaN(this.state.dateDisplay.getFullYear())) {
      return `${this.state.dateDisplay.getFullYear()}-${this.state.dateDisplay.getMonth() + 1}-${this.state.dateDisplay.getDate()}`;
    } else {
      return "";
    }
  }

  deleteDeadline = () => {
    if (this.props.deadline !== "0000-00-00") {
      return <button
          onClick={this.props.setTodoDeadlineNull.bind(this, this.props.todoId)}
          style={this.props.getButtonStyle()}
        >
          <FontAwesomeIcon icon={faEraser} />
        </button>
    }
  }

  render() {
    return (
      !this.props.isDateEditing ?
        <div>
          {this.dateAssembler()}
          {this.deleteDeadline()}
        </div>
      : // Else
        <div className="App">
          <SingleDatePicker
            date={this.state.date} // momentPropTypes.momentObj or null
            onDateChange={date => this.props.stopDateEditing(date)} // PropTypes.func.isRequired
            focused={this.state.focused} // PropTypes.bool
            onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
            id="your_unique_id" // PropTypes.string.isRequired,
          />
        </div>
    );
  }
}

export default DateMenu;

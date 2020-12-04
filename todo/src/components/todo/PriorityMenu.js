import React from "react";

class PriorityMenu extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      value: { min: 1, max: 5 },
    };
  }


  render() {
    return (
      <InputRange
        maxValue={5}
        minValue={1}
        value={this.state.value}
        onChange={value => this.props.setTodoPriority(value)} />
    )
  }
}

export default PriorityMenu
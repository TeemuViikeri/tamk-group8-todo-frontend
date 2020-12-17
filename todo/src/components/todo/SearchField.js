import React, { Component } from "react";
import TextInputField from "./TextInputField";
import "./css/dropdown.css";

class SearchField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      isSearching: false,
    };
  }

  getStyle = () => {
    return {
      flex: "1",
      display: "inline-block",
      maxWidth: "100%",
      overflow: "auto"
    }
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.searchTasks !== prevProps.searchTasks) {
      this.setState({ isSearching: true })
    }
  }

  getListName = (lists, todo) => {
    const { list_id } = todo;
    let name = "";

    for (const list of lists) {
      if (list.id === list_id) {
        name = list.name
      }
    }

    return name
  }

  render() {
    return (
      <div style={this.getStyle()}>
        <TextInputField
          idInput="search"
          title={this.state.title} 
          handleOnKeyUp={this.props.handleOnKeyUp}
          placeholder="Search tasks"
          paddingInput="0.625rem"
          marginInput="0.9375rem 0.9375rem 0.9375rem 1.25rem"
          flexInput="3"
          borderBottom="none"
          borderRadiusInput="0.75rem 0.75rem 0.75rem 0.75rem"
          bgColorInput={this.props.palette.fillInputColor}
          textColorInput={this.props.palette.fillTextColor}
          showButton={false}
          isSearching={this.state.isSearching}
          autocomplete="off"
          />
        {
          (this.state.isSearching)
          ? <div 
              className="search-container"
              style={{ 
                color: this.props.palette.fillTextColor, 
                width: "224px",
                height: "50%",
                backgroundColor: this.props.palette.bgPrimary,
                position: "absolute",
                top: "70px",
                right: "8%",
                zIndex: 1,
                overflowY: "auto",
                overflowX: "hidden",
                border: `2px solid ${this.props.palette.primary}`,
                borderRadius: "4px"
              }}
            >
              <h3 style={{ color: this.props.palette.primary, fontWeight: "bold", margin: "0.5rem 0 0 1rem", fontSize: "1.75rem" }}>
                Tasks
                <span 
                  onClick={() => this.setState({ isSearching: false })} 
                  style={{ 
                    color: this.props.palette.fillClearButton, 
                    float: "right", 
                    marginRight: "1rem", 
                    cursor: "pointer" 
                  }}
                >
                  &times;
                </span>
              </h3>
              <ul style={{ listStyleType: "none"}}>
                {this.props.searchTasks.map((task, i) => 
                  <li key={i} style={{ margin: "1rem" }}>
                    <p style={{ fontWeight: "600" }}>{task.title}</p>
                    <p style={{ fontStyle: "italic", fontSize: "0.8rem"}}>
                      {
                        this.getListName(this.props.lists, task)
                      }
                    </p>
                  </li>)}
              </ul>
            </div>
          : <></>
        }
      </div>
    )
  }
}

export default SearchField;

import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";

class Date_Idea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateId: this.props,
      dateIdea: this.props,
      newDateText: "",
    };
  }

  editDateIdea(input) {
    const { date_idea, idea_id } = input;
    axios.put("/api/edit_date/", { editText: date_idea, date_id: idea_id });
  }

  render() {
    console.log(this.props.ideaNId);
    const { ideaNId } = this.props;
    const { date_idea } = ideaNId;
    return (
      <div>
        <div>{date_idea}</div>
        <input
          onChange={(e) => this.setState({ newDateText: e.target.value })}
        />
        <button onClick={this.editDateIdea(ideaNId)}>edit</button>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return reduxState;
}
export default connect(mapStateToProps, {})(Date_Idea);

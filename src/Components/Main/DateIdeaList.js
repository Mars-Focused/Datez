import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import Date_Idea from "./DateIdea";
import selectComp from "../../Redux/compReducer";
import store from "../../Redux/store";

class Date_Idea_list extends Component {
  constructor(props) {
    super(props);
    this.state = {
      compName: this.props.compName,
      dateIdeaArr: [],
    };
    // console.log(this.props);
  }

  async componentDidUpdate(prevProps) {
    // console.log(this.props.comp.compName);
    if (prevProps.comp.compName !== this.props.comp.compName) {
      //prevProps is a way of checking if the props has changed
      const selectedCompName = this.props.comp.compName;
      await axios
        .get(`/api/date_ideas/${selectedCompName}`)
        .then((res) => {
          // console.log(res.data);
          this.setState({ dateIdeaArr: res.data });
          store.dispatch({ type: "UPDATE_MATCH_ID", payload: res.data });
        })
        .catch((err) => console.log(err));
    }
  }

  render() {
    const datezArr = this.state.dateIdeaArr;
    // console.log(`DatezArr: ${this.res.data}`);
    // console.log(`Selected Companion: ${this.props.comp.compName}`);
    return (
      <div className="date_list">
        {datezArr.map((date_idea) => (
          <Date_Idea ideaNId={date_idea} />
        ))}
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return reduxState;
}
export default connect(mapStateToProps, { selectComp })(Date_Idea_list);

import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import Date_Idea from "./DateIdea";
import selectComp from "../../Redux/compReducer";
// import compReducer from "../../Redux/compReducer";

class Date_Idea_list extends Component {
  constructor(props) {
    super(props);
    this.state = {
      compName: this.props,
      dateIdeaArr: [],
    };
    // this.getDateIdeas = this.getDateIdeas.bind(this);
  }

  //I NEED TO FIND A WAY TO GET compId INTO `/api/date_ideas/${compId}` without EVERYTHING BREAKING ******************************************
  componentDidMount() {
    const selectedCompName = this.state.compName.comp.compName;
    // console.log(this.props);
    let dateIdeaArr = axios
      .get(`/api/date_ideas/${selectedCompName}`)
      .then((compId) => {
        console.log("Promise returned");
        console.log(`selectedCompName: ${selectedCompName}`);
        return compId;
      })
      .catch((err) => console.log(err));
    this.setState({ dateIdeaArr: dateIdeaArr });
    console.log(this.state);
  }
  //CHECK IF THE RETURN OF axios.get(`/api/date_ideas/${compId}`); is an array
  // If it asks me to update imports just say no.
  //MAP OVER THAT ARRAY INSIDE OUR RETURN JUST LIKE WE DID IN COMPANIONS
  render() {
    console.log(this.props.comp.compName);
    // this.setState({
    // });
    return (
      <div className="date_list">
        <Date_Idea compName={this.props.comp.compName} />
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return reduxState;
}
export default connect(mapStateToProps, { selectComp })(Date_Idea_list);

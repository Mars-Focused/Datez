import React, { Component } from "react";
import "./Companions.scss";
import axios from "axios";
import { connect } from "react-redux";
import CompName from "./CompName";
import { withRouter } from "react-router-dom";
// import store from "../../Redux/store";

class Companions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companions: [],
    };
  }
  componentDidMount() {
    axios.get("/api/companions").then((res) => {
      // console.log(`companions res.data: ${res.data}`);
      this.setState({ companions: res.data });
    });
  }

  render() {
    const { companions } = this.state;
    // console.log(companions);

    return (
      <div className="companion_list">
        <button onClick={() => this.props.history.push("/Search")}>
          Add Companion
        </button>
        {companions.map((companion) => (
          <CompName companion={companion} />
        ))}
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return reduxState;
}
//withRouter manually adds functionality as if the component was wrapped in HashRouter
export default connect(mapStateToProps, {})(withRouter(Companions));

import React, { Component } from "react";
import { connect } from "react-redux";
import { selectComp } from "../../Redux/compReducer";
import "./CompName.scss";
import store from "../../Redux/store";
import axios from "axios";
class CompName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      compId: this.props.compId,
      username: this.props.username,
    };
    this.addCompNameToState = this.addCompNameToState.bind(this);
  }

  addCompNameToState(compName) {
    store.dispatch({ type: "SELECT_COMPANION", payload: compName });
    // console.log(`Selected Companion: ${compName}`);
    // this.setState({ compName: compName });
  }

  componentDidMount() {
    this.addCompNameToState(this.props.companion.username);
  }

  deleteCompanion(comp) {
    axios
      .delete(`/api/delete_companion/${comp}`)
      .catch((err) => console.log(err));
  }

  render() {
    const { username } = this.props.companion;
    // console.log(username);
    return (
      <div className="comp_name">
        <button
          onClick={() => this.addCompNameToState(username)}
          className="comp_click"
        >
          {username}
        </button>
        <button onClick={() => this.deleteCompanion(username)}>X</button>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return reduxState;
}
export default connect(mapStateToProps, { selectComp })(CompName);

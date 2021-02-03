import React, { Component } from "react";
import Companions from "./Companions";
import Header from "./Header";
import Date_Idea_List from "../Main/DateIdeaList";
import "./Main.scss";

export default class Main extends Component {
  render() {
    return (
      <div className="main">
        <Header push={this.props.history.push} />
        <div className="not_header">
          <Companions />
          <Date_Idea_List />
        </div>
      </div>
    );
  }
}

import React, { Component } from "react";
import axios from "axios";
import "./Header.scss";
// import { reducer } from "../../Redux/userReducer";

//this is step 1 of subscribing a component
import { connect } from "react-redux";

// console.log(connect);

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      comp: "",
      text: "",
    };
    this.logout = this.logout.bind(this);
    this.addDate = this.addDate.bind(this);
  }

  // async register(e) {
  //   if (e) e.preventDefault();
  // }

  async componentDidMount() {
    this.setState({
      user: this.props.user.user.username,
      comp: this.props.comp.compName,
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.comp.compName !== this.props.comp.compName) {
      this.setState({
        comp: this.props.comp.compName,
      });
    }
  }

  addDate() {
    //axios POST to "/api/add_date/:comp"
    //app.post("/api/add_date/:comp", dateCtrl.addDateIdea); <- That's what's in our index
    const { comp, text, user } = this.state;
    console.log(user);
    // console.log(text);
    axios
      .post(`/api/add_date/${comp}`, { date: text })
      .catch((err) => console.log(err));
  }

  logout() {
    axios
      .get("/auth/logout")
      .then(() => {
        // this.props.updateUser({});
        this.props.push("/");
      })
      .catch((err) => console.log(err));
  }
  //create a new property in state for header that holds what the user typed in the date idea input
  //have input onchange connect to a function that will update state when they type. (or do what they do on Login.js line59)
  //send date Idea from state in the axios request body (Login.js line24)
  //in handler Function get what you need from req.body (server/index.js line45)
  //get that information back from the database (i'm pretty sure we do that in DateIdeaList)

  render() {
    // const { username } = this.state.comp;
    const { user } = this.state;
    // console.log(this.state.user);
    return (
      <div className="header">
        <div className="Logo">DATEZ</div>
        <h1 className="login_name">{user}</h1>
        <input
          placeholder="Date input"
          onChange={(e) => this.setState({ text: e.target.value })}
        />
        <button className="add_date_button" onClick={this.addDate}>
          Add Date
        </button>
        <button className="login_btn" onClick={this.logout}>
          Logout
        </button>
      </div>
    );
  }
}

//this is step 2 of subscribing a component
function mapStateToProps(reduxState) {
  return reduxState;
}

export default connect(mapStateToProps, {})(Header);

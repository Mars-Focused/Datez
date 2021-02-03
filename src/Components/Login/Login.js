import React, { Component } from "react";
import axios from "axios";
import "./Login.scss";
import { connect } from "react-redux";
import { loginUser } from "../../Redux/userReducer";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
  }

  async register(e) {
    if (!this.state.username || !this.state.password)
      return alert("cannot be blank");
    if (e) e.preventDefault();
    const { username, password } = this.state;
    try {
      const res = await axios.post("/auth/register", { username, password }); //<- whats inside these curly braces is "body"
      if (res.data.id) this.props.history.push("/Main");
    } catch (e) {
      alert("User already exists");
      // this.props.history.push("/");
    }
  }

  async login(e) {
    if (e) e.preventDefault();
    const { username, password } = this.state;
    try {
      const user = await axios.post("/auth/login", { username, password }); // <- axios.post to log the user in, response is req.session.user from the server, storing it in variable called user.
      //Username and Password go straight onto req.body
      console.log("trying to Log in", user.data);
      if (user.data.id) {
        // console.log(`user.data ${user.data[0]}`);
        // <- When you get a successful response from axios it's stored on a object called "data".
        this.props.loginUser(user.data); // <- is calling the function loginUser on userReducer.js line 19
        this.props.history.push("/Main"); // .this will end the function kind of like a return statement
        this.setState({ user: this.state });
      }
    } catch (e) {
      alert("Login failed. Please try again.");
    }
  }
  render() {
    return (
      <div className="login">
        <h1 className="title">DATEZ</h1>
        <div className="login-cluster">
          <input
            type="text"
            className="username-input"
            placeholder="Name"
            onChange={(e) => this.setState({ username: e.target.value })}
          />
          <input
            type="password"
            className="password-input"
            placeholder="Password"
            onChange={(e) => this.setState({ password: e.target.value })}
          />
          <p className="login-btns">
            <button
              className="register-btn"
              type="submit"
              onClick={this.register}
            >
              Sign up
            </button>
            <button className="login-btn" type="submit" onClick={this.login}>
              Login
            </button>
          </p>
        </div>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return reduxState;
}

export default connect(mapStateToProps, { loginUser })(Login);

import React, { Component } from "react";
import axios from "axios";
import "./styles.css";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signinInfo: {
        name: "",
        email_id: "",
        password: "",
      },
      emailExistsError: false, // new state property to keep track of email exists error
    };
  }

  handleChange = (e) => {
    let signinInfo = { ...this.state.signinInfo };
    signinInfo[e.target.name] = e.target.value;
    this.setState({ signinInfo });
  };

  handleSignUp = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/register_user/", this.state.signinInfo)
      .then((response) => {
        if (response.data.status === "success") {
          alert("User Register Successfully");
          window.location.href = "/";
        } else if (response.data.status === "failure") {
          this.setState({ emailExistsError: true }); // set emailExistsError to true
          console.log(response.data.reason);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { emailExistsError } = this.state;
    return (
      <div>
        <div>
          <div className="container">
            <h2>Sign Up</h2>
            <form method="POST" onSubmit={this.handleSignUp}>
              <label>
                <div className="text-place">Name</div>
                <input
                  className="form-control input-box"
                  name="name"
                  type="text"
                  placeholder="Name"
                  onChange={this.handleChange}
                  required
                />
              </label>
              <label>
                <div className="text-place">Email</div>
                <input
                  name="email_id"
                  type="email"
                  placeholder="Email"
                  onChange={this.handleChange}
                  required
                  className={`form-control input-box emailExistsError ? "error" : ""`} // add 'error' class when emailExistsError is true
                />
                {emailExistsError && (
                  <div className="error-message">User already exists</div>
                )}
              </label>
              <label>
                <div className="text-place">Password</div>
                <input
                  className="form-control input-box"
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={this.handleChange}
                  required
                />
              </label>
              <button type="submit" className="bg-dark">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;

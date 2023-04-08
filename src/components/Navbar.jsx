import React, { Component } from 'react'
import { Link } from "react-router-dom";
class navbar extends Component {

  handleLogout = (e) => {
    e.preventDefault();
    axios.post("http://127.0.0.1:8000/logout/", localStorage.getItem('session_id'))
      .then((response) => {
        if (response.data.status === "success") {
          localStorage.removeItem('session_id');
          window.location.href="/home"
        }
        else if (response.data.status === "failure") {
          alert("Invalid session_id");
          console.log(response.data.reason);
        }
      }).catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <nav class="navbar bg-dark">
          <div class="container-fluid">           
            <Link to= "/" class="navbar-brand text-white">LOG - MONITOR</Link>
            {localStorage.getItem("session_id") ? (
            <div>
                <text>
                    {localStorage.getItem('session_id')}
                </text>
              <Link to="/sign-up">
                <button
                    type="button"
                    className="btn btn-sm btn-light"
                    onClick={this.handleLogout}
                  >
                  Logout
                </button>
              </Link>
            </div>
            ): (
                <div>
                  <Link to="/">
                    <button
                    type="button"
                    className="btn btn-sm btn-outline-light me-2"
                    >
                    Sign in
                    </button>
                  </Link>                 
                  <Link to="/sign-up">                  
                    <button type="button" className="btn btn-sm btn-light">                    
                      Sign up                    
                    </button>                  
                  </Link>                 
                </div>               
            )}
          </div>
        </nav>
        </div>
        
    )
  }
}

export default navbar

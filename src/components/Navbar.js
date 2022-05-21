import React, { Component } from "react";
import logo from "../images/logo.png";
import { FaAlignRight, FaUserPlus, FaUserMinus } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { MdRoomService } from "react-icons/md";
import { Link } from "react-router-dom";
import { withAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

class Navbar extends Component {
  state = {
    isOpen: false,
  };

  handleToggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const { user, isAuthenticated, logout } = this.props.auth0;
    console.log("here", this.props.auth0);

    return (
      <>
        <nav className="navbar">
          <div className="nav-center">
            <div className="nav-header">
              <Link to="/">
                <img style={{ width: "60%" }} src={logo} alt="Beach Resort" />
              </Link>
              <button
                type="button"
                className="nav-btn"
                onClick={this.handleToggle}
              >
                <FaAlignRight className="nav-icon" />
              </button>
            </div>
            <ul
              className={this.state.isOpen ? "nav-links show-nav" : "nav-links"}
            >
              <li>
                <Link to="/">
                  Home <AiFillHome size={18} />
                </Link>
              </li>
              <li>
                <Link to="/rooms">
                  Rooms <MdRoomService size={20} />
                </Link>
              </li>
              <li>
                {user ? (
                  <Link
                    type="button"
                    onClick={() => {
                      localStorage.removeItem("user");
                      logout({ returnTo: window.location.origin });
                    }}
                  >
                    Logout <FaUserMinus />
                  </Link>
                ) : (
                  <Link
                    type="button"
                    onClick={this.props.auth0.loginWithRedirect}
                  >
                    Login <FaUserPlus />
                  </Link>
                )}
              </li>
              {user && (
                <li>
                  <Link>Hello, {user.name}</Link>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </>
    );
  }
}

export default withAuth0(Navbar);

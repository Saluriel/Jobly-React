import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import "./NavBar.css"
import UserContext from "../UserContext";


function NavBar({ logout }) {
    const { currentUser } = useContext(UserContext)
    function loggedInNavBar() {
        return (
            <div>
                <Navbar className="nav">
                    <NavLink exact to="/" className="navbar-brand">
                        Jobly
                    </NavLink>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink to="/companies">Companies</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/jobs">Jobs</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/profile">Profile</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/" onClick={logout}>Logout {currentUser.first_name || currentUser.username}</NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
            </div>)
    }

    function loggedOutNavBar() {
        return (
            <div>
                <Navbar className="nav">
                    <NavLink exact to="/" className="navbar-brand">
                        Jobly
                    </NavLink>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink to="/login">Login</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/signup">SignUp</NavLink>
                        </NavItem>

                    </Nav>
                </Navbar>
            </div>
        );
    }
    return (currentUser ? loggedInNavBar() : loggedOutNavBar())
}

export default NavBar;

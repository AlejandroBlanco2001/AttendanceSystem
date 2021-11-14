import React from "react";
import { Link, NavLink } from "react-router-dom";
const Navbar = ({ children }) => {
  return (
    <>
      <nav className="nav nav-center">
        <ul>
          <li>
            <NavLink
              to="/courseslist"
              className={(isActive) =>
                "nav-link" + (!isActive ? " unselected" : "")
              }
            >
              My courses
            </NavLink>
          </li>
          <li>
            <NavLink to="/">logout</NavLink>
          </li>

          <li>
            <NavLink to="/">profile</NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;

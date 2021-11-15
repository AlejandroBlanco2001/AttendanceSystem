import React from "react";
import MyCoursesICON from "../assets/icons/list.png";
import ProfileIcon from "../assets/icons/user.png";
import LogoutIcon from "../assets/icons/exitt.png";
import { Link, NavLink } from "react-router-dom";
const Navbar = ({ children }) => {
  let activeStyle = {
    textDecoration: "underline",
    color: "#c51618",
  };
  return (
    <>
      <nav className="nav nav-center">
        <ul>
          <li>
            <img src={MyCoursesICON} alt="my courses" />
            <NavLink to="../courseslist">My courses</NavLink>
          </li>

          <li>
            <img src={ProfileIcon} alt="" />
            <NavLink to="/studentslist">profile</NavLink>
          </li>
          <li>
            <img src={LogoutIcon} alt="" />
            <NavLink to="/">logout</NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AttendanceLogo from "../assets/logoattendance.png";
import { Link } from "react-router-dom";
import axios from "axios";
// navigate("../studentslist", { replace: true });

const Login = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const sendForm = (event) => {
    event.preventDefault();
    console.log("enviando datos..." + data.username + " " + data.password);
    event.preventDefault();
    axios
      .post(
        "http://localhost:80/login",
        {
          username: data.username,
          password: data.password,
        },
        { withCredentials: true }
      )
      .then((res) => {});
  };
  return (
    <main class="login">
      <form action="" class="login-form" onSubmit={sendForm}>
        <img src={AttendanceLogo} alt="" />
        <div class="form-block">
          <label for="username">USERNAME</label>
          <input
            type="text"
            id="username"
            placeholder="type your username"
            onChange={handleInputChange}
            name="username"
          />
        </div>
        <div class="form-block">
          <label for="password">PASSWORD</label>
          <input
            type="password"
            placeholder="*****"
            id="password"
            onChange={handleInputChange}
            name="password"
          />
        </div>
        <input type="submit" class="button primary-button" value="SIGN IN" />
        <Link to="/set_password">First Log In</Link>
      </form>
    </main>
  );
};

export default Login;

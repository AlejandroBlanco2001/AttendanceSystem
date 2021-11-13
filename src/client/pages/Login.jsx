import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AttendanceLogo from "../assets/logoattendance.png";
import { Link } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const handleInputChange = (event) => {
    // console.log(event.target.name);
    // console.log(event.target.value);
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };
  
  const sendForm = (event) => {
    event.preventDefault();
    console.log("enviando datos..." + data.username + " " + data.password);
    event.preventDefault();
    fetch("http://localhost:80/login/auth", {
      method: "POST",
      body: JSON.stringify(data),
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          navigate('../studentslist',{replace: true});
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Error logging in please try again");
      });
  };
  return (
    <main class="login">
      <form action="" class="login-form" onSubmit={sendForm}>
        <img src={AttendanceLogo} alt="" />
        <div class="form-block">
          <label for="username">Username</label>
          <input
            type="username"
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
        <Link to='/set_password'>First Log In</Link>
      </form>
    </main>
  );
};

export default Login;

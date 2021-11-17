import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AttendanceLogo from "../assets/logoattendance.png";
import { Link } from "react-router-dom";
import { myContext } from "../components/Context";
import MyModal from "../components/Modal";
import axios from "axios";

const Login = () => {
  const [error, setError] = useState(false);
  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleError = () => setError(false);
  const context = useContext(myContext);
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
        "http://localhost:80/login/auth",
        {
          username: data.username,
          password: data.password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log("Log in");
        console.log(res);
        setOpen(true);
        axios
          .get("http://localhost:80/user/me", { withCredentials: true })
          .then((res) => {
            context.setUser(res.data);
            setOpen(false);
            navigate("../courseslist", { replace: true });
          });
      })
      .catch((err) => {
        setError(true);
      });
  };
  return (
    <>
      <MyModal
        loading={true}
        title={"Logging in"}
        text={"Please wait"}
        open={open}
        handleClose={handleClose}
      />
      <MyModal
        loading={false}
        title="ERROR"
        text={
          "Failed to log in, if this is your first time please click on the link below to update your password"
        }
        open={error}
        handleClose={handleError}
      />
      <main className="login">
        <form action="" className="login-form" onSubmit={sendForm}>
          <img src={AttendanceLogo} alt="" />
          <div className="form-block">
            <label htmlFor="username">USERNAME</label>
            <input
              type="text"
              id="username"
              placeholder="type your username"
              onChange={handleInputChange}
              name="username"
            />
          </div>
          <div className="form-block">
            <label htmlFor="password">PASSWORD</label>
            <input
              type="password"
              placeholder="*****"
              id="password"
              onChange={handleInputChange}
              name="password"
            />
          </div>
          <input
            type="submit"
            className="button primary-button"
            value="SIGN IN"
          />
          <Link to="/set_password">First Log In</Link>
        </form>
      </main>
    </>
  );
};

export default Login;

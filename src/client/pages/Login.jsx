import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AttendanceLogo from "../assets/logoattendance.png";
import { Link } from "react-router-dom";
import { myContext } from "../components/Context";
import CircularProgress from "@mui/material/CircularProgress";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import axios from "axios";

const Login = () => {
  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const context = useContext(myContext);
  const navigate = useNavigate();
  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    fontFamily: "Quicksand",
    height: 120,
    bgcolor: "background.paper",
    border: "none",
    borderRadius: 3,
    outline: "none",
    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
    pt: 2,
    px: 4,
    pb: 3,
  };

  const sendForm = (event) => {
    event.preventDefault();
    console.log("enviando datos..." + data.username + " " + data.password);
    setOpen(true);
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
        axios
          .get("http://localhost:80/user/me", { withCredentials: true })
          .then((res) => {
            context.setUser(res.data);
            // setUser(res.data);
            // console.log(user);
            setOpen(false);
            navigate("../courseslist", { replace: true });
          });
      });
  };
  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Loging In
          </Typography>
          <CircularProgress />
        </Box>
      </Modal>
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
    </>
  );
};

export default Login;

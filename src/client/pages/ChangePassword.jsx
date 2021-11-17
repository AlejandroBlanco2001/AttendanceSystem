import React, { useState } from "react";
import AttendanceLogo from "../assets/logoattendance.png";
import { useNavigate } from "react-router-dom";
import MyModal from "../components/Modal";
import axios from "axios";
const ChangePassword = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(false);
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
    const { username, id_code, new_password, confirm_password } = data;
    axios
      .post(
        "http://localhost:80/login/setPassword",
        {
          username,
          id_code,
          new_password,
          confirm_password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log("RES IN CHANGE PSS");
        console.log(res);
        setOpen(true);
        navigate("../login", { replace: true });
      });
  };
  return (
    <>
      <MyModal
        open={open}
        loading={true}
        title="Password successfully changed"
        text="Please log in"
      />
      <main class="login">
        <form action="" class="login-form" onSubmit={sendForm}>
          <img src={AttendanceLogo} alt="" />
          <div class="form-block">
            <label for="username">Username</label>
            <input
              type="username"
              id="username"
              placeholder="Your username"
              name="username"
              onChange={handleInputChange}
            ></input>
          </div>
          <div class="form-block">
            <label for="id_code">Code</label>
            <input
              type="id_code"
              id="id_code"
              placeholder="Your code"
              name="id_code"
              onChange={handleInputChange}
            ></input>
          </div>
          <div class="form-block">
            <label for="new_password">New password</label>
            <input
              type="password"
              id="new_password"
              placeholder="******"
              name="new_password"
              onChange={handleInputChange}
            />
          </div>
          <div class="form-block">
            <label for="password">Confirm password</label>
            <input
              type="password"
              placeholder="*****"
              name="confirm_password"
            />
          </div>
          <input
            type="submit"
            class="button primary-button"
            value="Change password"
          />
        </form>
      </main>
    </>
  );
};
export default ChangePassword;

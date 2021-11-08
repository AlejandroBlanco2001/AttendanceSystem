import React from "react";
import AttendanceLogo from "../assets/logoattendance.png";
const Login = () => {
  return (
    <main class="login">
      <form action="" class="login-form">
        <img src={AttendanceLogo} alt="" />
        <div class="form-block">
          <label for="email">EMAIL</label>
          <input type="email" id="email" placeholder="type your email" />
        </div>
        <div class="form-block">
          <label for="password">PASSWORD</label>
          <input type="password" placeholder="*****" />
        </div>
        <input type="submit" class="button primary-button" value="SIGN IN" />
      </form>
    </main>
  );
};

export default Login;

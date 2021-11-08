import React from "react";
import HomeBackground from "../assets/home-background.svg";
import HomeLogo from "../assets/uni-logo-centered.svg";
import { Link } from "react-router-dom";
import "../styles/global.css";
const Start = () => {
  return (
    <main class="home">
      <picture class="home-logo">
        <img src={HomeLogo} alt="" />
      </picture>
      <picture class="home-image">
        <img src={HomeBackground} alt="" />
      </picture>
      <div class="home-buttons">
        <h1 class="main-title">Soy</h1>
        <Link exact to="/login">
          <button className="button primary-button">ESTUDIANTE</button>
        </Link>
        <Link exact to="/login">
          <button className="button secondary-button">PROFESOR</button>
        </Link>
      </div>
    </main>
  );
};

export default Start;

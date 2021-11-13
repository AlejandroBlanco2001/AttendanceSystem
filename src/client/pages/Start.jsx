import React from "react";
import HomeBackground from "../assets/home-background.svg";
import HomeLogo from "../assets/uni-logo-centered.svg";
import UninorteAttendance from "../assets/logoattendance.png";
import HomeImage1 from "../assets/studentimage.svg";
import HomeImage2 from "../assets/attendancehome.svg";
import PerformanceIcon from "../assets/icons/performance.png";
import StatsIcon from "../assets/icons/stats.png";
import TeacherIcon from "../assets/icons/teacher.png";
import { Link } from "react-router-dom";
import "../styles/global.css";
const Start = () => {
  return (
    <>
      <nav className="nav">
        <img src={UninorteAttendance} alt="" className="nav-logo" />
        <ul>
          <li>
            <a href="">HOME</a>
          </li>
          <li>
            <a href="">THE PROJECT</a>
          </li>
          <li>
            <a href="">AUTHORS</a>
          </li>
          <li>
            <a href="">CONTRIBUTE</a>
          </li>
        </ul>
      </nav>
      <main className="home">
        <div className="home-container">
          <figure className="home-container__img">
            <img src={HomeImage1} alt="" />
          </figure>
          <div className="home-container__info">
            <div className="home--title">
              <h1>
                <span>IMPROVE</span> YOUR <br /> CLASS WORKFLOW
              </h1>
              <p>
                Optimize your time taking course attendance with a few clicks
              </p>
              <button className="">MORE</button>
            </div>
            <figure className="home--image">
              <img src={HomeImage2} alt="" />
            </figure>
          </div>
        </div>
        <section className="features">
          <h2>FEATURES</h2>
          <div className="features-container">
            <div className="feature">
              <img src={TeacherIcon} alt="student" />
              <h3>Add students and teachers</h3>
              <p>
                Insert students and create a complete user profile for every
                member{" "}
              </p>
            </div>
            <div className="feature">
              <img src={PerformanceIcon} alt="class" />
              <h3>Improve class workflow</h3>
              <p>
                With a single click activate a QR for your class and take the
                attendance with it
              </p>
            </div>
            <div className="feature">
              <img src={StatsIcon} alt="class" />
              <h3>Detailed stats </h3>
              <p>
                Get detailed statistics about your courses attendance and
                students performance
              </p>
            </div>
          </div>
        </section>
        <section className="contribute">
          <div className="contribute-data">
            <h2>Want to be part of the project?</h2>
          </div>
          <div className="contribute-button">
            <button>GO TO GITHUB</button>
          </div>
        </section>
      </main>
    </>
  );
};

export default Start;

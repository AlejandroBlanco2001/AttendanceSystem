import React from "react";
import HomeBackground from "../assets/home-background.svg";
import HomeLogo from "../assets/uni-logo-centered.svg";
import UninorteAttendance from "../assets/logoattendance.png";
import HomeImage1 from "../assets/studentimage.svg";
import HomeImage2 from "../assets/attendancehome.svg";
import PerformanceIcon from "../assets/icons/performance.png";
import StatsIcon from "../assets/icons/stats.png";
import TeacherIcon from "../assets/icons/teacher.png";
import ContributeImage from "../assets/contribute.png";
import GithubIcon from "../assets/icons/github.png";
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
              {/* <button className="">MORE</button> */}
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
            <h2>DO YOU WANT TO BE PART OF THE PROJECT?</h2>
            <p>Help us improving this students attendance management system</p>
          </div>
          <div className="contribute-container">
            <div className="contribute-buttons">
              <div className="contribute-button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <Link to="/">GITHUB</Link>
              </div>
              <div className="contribute-button start-button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M14 12h-4v-12h4v12zm4.213-10.246l-1.213 1.599c2.984 1.732 5 4.955 5 8.647 0 5.514-4.486 10-10 10s-10-4.486-10-10c0-3.692 2.016-6.915 5-8.647l-1.213-1.599c-3.465 2.103-5.787 5.897-5.787 10.246 0 6.627 5.373 12 12 12s12-5.373 12-12c0-4.349-2.322-8.143-5.787-10.246z" />
                </svg>
                <Link to="/login">START HERE</Link>
              </div>
            </div>
            <div className="contribute-image">
              <img src={ContributeImage} alt="" />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Start;

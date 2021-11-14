import React from "react";
import MathIcon from "../assets/icons/math.png";
import ProgrammingIcon from "../assets/icons/programming.png";
import EthicsIcon from "../assets/icons/ethics.png";
const CoursesList = (props) => {
  // const data = props.location.state || {};
  return (
    <>
      <h1 class="courses-title">
        Welcome, <span>{"Jonathan"}</span>
      </h1>
      <h2 class="courses-subtitle">Courses list</h2>
      <main class="courses-container">
        <div class="course-card">
          <img src={MathIcon} alt="" class="course-image" />
          <h4 class="course-title">Calculus I</h4>
          <div class="course-data">
            <p class="course-teacher">Bienvenido Barraza</p>
            <p class="course-length">5 credits</p>
            <p className="course-length">
              W:13:00 - 15:00 <br /> F: 7:00 - 10:00
            </p>
          </div>
          <button className="button secondary-button">START</button>
        </div>

        <div class="course-card">
          <img src={ProgrammingIcon} alt="" class="course-image" />
          <h4 class="course-title">OOP</h4>
          <div class="course-data">
            <p class="course-teacher">Pedro Lobo</p>
            <p class="course-length">4 credits</p>
            <p className="course-length">
              W:13:00 - 15:00 <br /> F: 7:00 - 10:00
            </p>
          </div>
          <button className="button secondary-button">START</button>
        </div>

        <div class="course-card">
          <img src={EthicsIcon} alt="" class="course-image" />
          <h4 class="course-title">Ethics</h4>
          <div class="course-data">
            <p class="course-teacher">Augusto Salazar</p>
            <p class="course-length">1 credit</p>
            <p className="course-length">
              W:13:00 - 15:00 <br /> F: 7:00 - 10:00
            </p>
          </div>
          <button className="button secondary-button">START</button>
        </div>

        <div class="course-card">
          <img src={MathIcon} alt="" class="course-image" />
          <h4 class="course-title">Calculus I</h4>
          <div class="course-data">
            <p class="course-teacher">Bienvenido Barraza</p>
            <p class="course-length">5 credits</p>
            <p className="course-length">
              W:13:00 - 15:00 <br /> F: 7:00 - 10:00
            </p>
          </div>
          <button className="button secondary-button">START</button>
        </div>

        <div class="course-card">
          <img src={ProgrammingIcon} alt="" class="course-image" />
          <h4 class="course-title">OOP</h4>
          <div class="course-data">
            <p class="course-teacher">Pedro Lobo</p>
            <p class="course-length">4 credits</p>
            <p className="course-length">
              W:13:00 - 15:00 <br /> F: 7:00 - 10:00
            </p>
          </div>
          <button className="button secondary-button">START</button>
        </div>

        <div class="course-card">
          <img src={MathIcon} alt="" class="course-image" />
          <h4 class="course-title">Calculus I</h4>
          <div class="course-data">
            <p class="course-teacher">Bienvenido Barraza</p>
            <p class="course-length">5 credits</p>
            <p className="course-length">
              W:13:00 - 15:00 <br /> F: 7:00 - 10:00
            </p>
          </div>
          <button className="button secondary-button">START</button>
        </div>

        <div class="course-card">
          <img src={ProgrammingIcon} alt="" class="course-image" />
          <h4 class="course-title">OOP</h4>
          <div class="course-data">
            <p class="course-teacher">Pedro Lobo</p>
            <p class="course-length">4 credits</p>
            <p className="course-length">
              W:13:00 - 15:00 <br /> F: 7:00 - 10:00
            </p>
          </div>
          <button className="button secondary-button">START</button>
        </div>
      </main>
    </>
  );
};

export default CoursesList;

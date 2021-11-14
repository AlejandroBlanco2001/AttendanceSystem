import React from "react";
import AttendanceLogo from "../assets/logoattendance.png";
import { Link } from "react-router-dom";
const CourseAttendance = () => {
  const sendForm = () => {};
  const handleInputChange = () => {};
  return (
    <main className="login">
      <form action="" class="login-form" onSubmit={sendForm}>
        <section className="class-data student-attendance">
          <p>Object oriented programming</p>
          <p>Pedro Wightman</p>
          <p>4 creds</p>
          <p>NRC: 4410</p>
          <p>Course code: IST1010</p>
        </section>
        <div class="form-block">
          <label for="techercode">TEACHER'S CODE</label>
          <input
            type="number"
            id="teachercode"
            placeholder="001231"
            onChange={handleInputChange}
            name="teachercode"
          />
        </div>
        <div class="form-block">
          <label for="classcode">CLASS CODE</label>
          <input
            type="number"
            placeholder="1112301"
            id="classcode"
            onChange={handleInputChange}
            name="classcode"
          />
        </div>
        <input type="submit" class="button primary-button" value="SIGN IN" />
      </form>
    </main>
  );
};

export default CourseAttendance;

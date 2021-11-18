import React from "react";
import { Link } from "react-router-dom";

function CourseCard({ icon, title, teacher, credits, schedule }) {
  return (
    <div class="course-card">
      <img src={icon} alt="" class="course-image" />
      <h4 class="course-title">{title}</h4>
      <div class="course-data">
        <p class="course-teacher">{teacher}</p>
        <p class="course-length">{credits + " creds"}</p>
        <p className="course-length">
          {schedule}
        </p>
      </div>
      {/* <Link state = {} to = "/courseattendance" className = "button secondary-button">START</Link> */}
    </div>
  );
}

export default CourseCard;

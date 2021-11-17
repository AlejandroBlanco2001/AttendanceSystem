import React from "react";

function CourseCard({ icon, title, teacher, credits, schedule }) {
  return (
    <div class="course-card">
      <img src={icon} alt="" class="course-image" />
      <h4 class="course-title">{title}</h4>
      <div class="course-data">
        <p class="course-teacher">{teacher}</p>
        <p class="course-length">{credits + "creds"}</p>
        <p className="course-length">
          W:13:00 - 15:00 <br /> F: 7:00 - 10:00
        </p>
      </div>
      <button className="button secondary-button">START</button>
    </div>
  );
}

export default CourseCard;

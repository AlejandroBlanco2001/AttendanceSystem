import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// Profesor = 1, estudiante = 2
function CourseCard({scode, icon, title, teacher, credits, start_time_sche , code, type}) {
  const navigate = useNavigate();
  const handleClick = () => {
    if(type == '1') navigate("../studentslist", {replace:true, state:{scode,code, title, teacher, credits, start_time_sche}})
    else navigate("../courseattendance", {replace: true, state:{code, title, teacher, credits, start_time_sche}})
  }

  return (
    <div class="course-card">
      <img src={icon} alt="" class="course-image" />
      <h4 class="course-title">{title}</h4>
      <div class="course-data">
        <p class="course-length">{code}</p> 
        <p class="course-teacher">{teacher}</p>
        <p class="course-length">{credits + " creds"}</p>
        <p className="course-length">
          {start_time_sche}
        </p>
      </div>
    <button className = "button secondary-button" onClick = {handleClick}>Start</button>  
    </div>
  );
}

export default CourseCard;

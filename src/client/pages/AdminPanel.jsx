import React from "react";
import "../styles/adminpanel.css";
import father from "../assets/icons/user.png";
import { Link } from "react-router-dom";

const AdminPanel = () => {

  return (
    <div>
    <header className ="header-admin">
        <h1 className="title">Select one option</h1>
      </header>
    <main>                                                                   
     
                       
   
        <div className="opciones">
          <Link to="/users" className="opciones--card">
          <img src={father} alt="" />
            <h2 className="card-title">Users</h2>
          </Link>
          
           <Link to="/persons" className="opciones--card">
           <img src={father} alt="" />
            <h2 className="card-title">Persons</h2>
          </Link>

          <Link to="/subjects" className="opciones--card">
          <img src={father} alt="" />
            <h2 className="card-title">Subjects</h2>
          </Link>

          <Link to="/deparments" className="opciones--card">
          <img src={father} alt="" />
            <h2 className="card-title">Deparments</h2>
          </Link>

          <Link to="/courses" className="opciones--card">
          <img src={father} alt="" />
            <h2 className="card-title">Courses</h2>
          </Link>

          <Link to="/spaces" className="opciones--card">
          <img src={father} alt="" />
            <h2 className="card-title">Spaces</h2>
          </Link>

          
          <Link to="/schedules" className="opciones--card">
          <img src={father} alt="" />
            <h2 className="card-title">Schedules</h2>
          </Link>

          
          <Link to="/classrooms" className="opciones--card">
          <img src={father} alt="" />
            <h2 className="card-title">ClassRooms</h2>
          </Link>

          
          <Link to="/classes" className="opciones--card">
          <img src={father} alt="" />
            <h2 className="card-title">Classes</h2>
          </Link>

          
          <Link to="/enrollments" className="opciones--card">
          <img src={father} alt="" />
            <h2 className="card-title">Enrollments</h2>
          </Link>

          
          <Link to="/periods" className="opciones--card">
          <img src={father} alt="" />
            <h2 className="card-title">Periods</h2>
          </Link>

          
          <Link to="/contracts" className="opciones--card">
          <img src={father} alt="" />
            <h2 className="card-title">Contracts</h2>
          </Link>

          
          <Link to="/syllabuses" className="opciones--card">
          <img src={father} alt="" />
            <h2 className="card-title">Syllabuses</h2>
          </Link>

          
          <Link to="/programs" className="opciones--card">
          <img src={father} alt="" />
            <h2 className="card-title">Programs</h2>
          </Link>


          <Link to="/periodCourses" className="opciones--card">
          <img src={father} alt="" />
            <h2 className="card-title">Period Courses</h2>
          </Link>

  
          <Link to="/enrollmentCourses" className="opciones--card">
          <img src={father} alt="" />
            <h2 className="card-title">Enrollment Courses</h2>
          </Link>


          <Link to="/studentClasses" className="opciones--card">
          <img src={father} alt="" />
            <h2 className="card-title">Student Classes</h2>
          </Link>

          <Link to="/syllabusSubjects" className="opciones--card">
          <img src={father} alt="" />
            <h2 className="card-title">Syllabus Subjects</h2>
          </Link>
        </div>
      </main>
      </div>
  );
};

export default AdminPanel;

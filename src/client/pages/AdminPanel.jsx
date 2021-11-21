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

          <div className="opciones--card">
          <img src={father} alt="" />
            <h2 className="card-title">Subjets</h2>
          </div>

          <div className="opciones--card">
          <img src={father} alt="" />
            <h2 className="card-title">Courses</h2>
          </div>

          <div className="opciones--card">
          <img src={father} alt="" />
            <h2 className="card-title">Spaces</h2>
          </div>

          <div className="opciones--card">
          <img src={father} alt="" />
            <h2 className="card-title">Schedules</h2>
          </div>

          
          <div className="opciones--card">
          <img src={father} alt="" />
            <h2 className="card-title">Classrooms</h2>
          </div>

          
          <div className="opciones--card">
          <img src={father} alt="" />
            <h2 className="card-title">Classes</h2>
          </div>

          
          <div className="opciones--card">
          <img src={father} alt="" />
            <h2 className="card-title">Enrollments</h2>
          </div>

          
          <div className="opciones--card">
          <img src={father} alt="" />
            <h2 className="card-title">Periods</h2>
          </div>

          
          <div className="opciones--card">
          <img src={father} alt="" />
            <h2 className="card-title">Contracts</h2>
          </div>

          
          <div className="opciones--card">
          <img src={father} alt="" />
            <h2 className="card-title">Syllabuses</h2>
          </div>

          
          <div className="opciones--card">
          <img src={father} alt="" />
            <h2 className="card-title">Programs</h2>
          </div>

          
          <div className="opciones--card">
          <img src={father} alt="" />
            <h2 className="card-title">Period Courses</h2>
          </div>


          <div className="opciones--card">
          <img src={father} alt="" />
            <h2 className="card-title">Enrollments Courses</h2>
          </div>

  
          <div className="opciones--card">
          <img src={father} alt="" />
            <h2 className="card-title">Student Classes</h2>
          </div>


          <div className="opciones--card">
          <img src={father} alt="" />
            <h2 className="card-title">Syllabus Subjects</h2>
          </div>
        </div>
      </main>
      </div>
  );
};

export default AdminPanel;

import React, {useState, useContext, useEffect} from "react";
import { useLocation } from 'react-router-dom';
import AttendanceLogo from "../assets/logoattendance.png";
import { Link } from "react-router-dom";
import { myContext } from "../components/Context";

import axios from 'axios';
const CourseAttendance = () => {
  const [data, setData] = useState({})
  const [state, setState] = useState({});

  const context = useContext(myContext);
  let location = useLocation();

  const sendForm = () => {
    console.log("location ", location);
    event.preventDefault();

    console.log("Sending attendance data ", data );
    axios.post("http://localhost:80/class/takeAttendance",{id_class: data.id_class, id_teacher: data.id_teacher}, {withCredentials: true})
    .then((response) => {
      console.log("Attendance taken zapzesfuli"); 
    })
    .catch((error) => {
      console.log("ERROR ON ATTENDANCE")
      console.error(new Error(error));
    })

  };


  const handleInputChange = (event) => {
      setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

useEffect(()=>{   
    setData(location.state)
    console.log("location ", location.state);
},[])


  return (
    <main className="login">
      <form action="" class="login-form" onSubmit={sendForm}>
        <section className="class-data student-attendance">
          <p>{(location.state?location.state.title:"Object oriented programming") }</p>
          <p>{(location.state?location.state.teacher:"Object oriented programming")}</p>
          <p>{(location.state?location.state.credits + " cred": "4 creds")}</p>
          <p>{"Course code: " + (location.state?location.state.code:"1010")}</p>
        </section>
        <div class="form-block">
          <label for="id_teacher">TEACHER'S CODE</label>
          <input
            type="text"
            id="id_teacher"
            placeholder="001231"
            onChange={handleInputChange}
            name="id_teacher"
          />
        </div>
        <div class="form-block">
          <label for="id_class">CLASS CODE</label>
          <input
            type="text"
            placeholder="1112301"
            id="id_class"
            onChange={handleInputChange}
            name="id_class"
          />
        </div>
        <input type="submit" class="button primary-button" value="JOIN CLASS" />
      </form>
    </main>
  );
};

export default CourseAttendance;

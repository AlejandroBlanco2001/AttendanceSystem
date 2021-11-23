import React , {useEffect, useState, useContext} from "react";
import IMGCodeTest from "../assets/qrrrr.jpg";
import Navbar from "../components/Navbar";
import { useLocation } from 'react-router-dom';
import { myContext } from "../components/Context";
import StudentCard from '../components/StudentCard';
import { DateTime } from 'luxon';
import axios from "axios";

const StudentsList = () => {
  let alreadySet = false;
  const [qrCode, setQRcode] = useState('');
  const [data, setData] = useState(null);
  const [students,setStudents] = useState([]);

  let location = useLocation();
  let context = useContext(myContext);
  
  console.log("data", data);

  const handleGenerateCodes = () => {
    context.socket.emit("classStarted",data.code);
  }; 

useEffect(()=>{
  setData(location.state);
  axios.post
  setInterval(() => {
    if(data){
      axios.post("http://localhost:80/class/getAttendance", {code: data.code}, {withCredentials: true}).
      then((response) => {
        console.log("RESPONSE IN STUDENTS LIST: ", response)
        if(!alreadySet){
          setQRcode(response.data[0].qr)
          alreadySet = true;
        }
        setStudents(response.data);
      }).catch((err) => {
        console.log("Updating list ERROR");
        console.error(new Error(error));
      })
    }
  },10000)
},[data])

  return (
    <>
      <Navbar />
      <main class="class-list">
        <section class="class-codes">
          <section className="class-data">
            <p>{(data?data.title:"nothing")}</p>
            <p>{(data?data.teacher:"Pedro")}</p>
            <p>{(data?data.credits + " creds":"4 credits")}</p>
            {/* <p>NRC: 4410</p> */}
            <p>Course code: {(data?data.code:"1010")}</p>
          </section>
          <div class="codes-teacher">
            <p>Teacher's code</p>
            <img src={IMGCodeTest} alt="IMG" />
            <p>{(qrCode?qrCode:'Class not started')}</p>
          </div>
          <div class="code-class">
            <p>Class code</p>
            <img src={IMGCodeTest} alt="IMG" />
            <p>{(data?data.scode+'/'+data.code:'Test')}</p>
          </div>
          <button className="button secondary-button generate-button" onClick = {handleGenerateCodes}>
            NOTIFY THE CLASS
          </button>
        </section>

        <section class="class-search">
          <input class="search" type="text" placeholder="Type a student name" />
          <p class="class-status">12 students missing</p>
        </section>
        <section class="class-list-container">
          <StudentCard name = "Jonathan Arias" code = {"1010101"} logtime = {"10:00:10 AM"}/>

          {(
            students? 
            students.map((student) => {
              return (
                <StudentCard name = {student.name} code = {student.id} logtime ={student.logAttendance}/>
              )
            })
            :
            <></>
          )}
        </section>
      </main>
    </>
  );
};

export default StudentsList;

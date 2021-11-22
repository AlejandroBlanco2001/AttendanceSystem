import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";
import swal from 'sweetalert';
export const myContext = createContext({});
let id;
const socket = io(`http://${window.location.hostname}:80`)
export default function Context(props) {
  const [user, setUser] = useState();
  
  useEffect(() => {
    axios
    .get("http://localhost:80/user/me", { withCredentials: true })
      .then((res) => {
        setUser(res.data); 
        id = res.data.id;
      });
    socket.on("classAlreadyStarted", (data) => {
        swal({
          title: `The class is about to start, here is your code for your class ${data[0].codigo} and this is for the teacher ${data[0].codeTeacher}`,
          text: `Class ${data[0].name} at ${data[0].schedule}`,
          icon: 'info'
        });
      })
      socket.on("sendNotification", (data) => {
        socket.emit('checkMyClass',{code: data, id_pers:id})
      })
      socket.on('sendNotificationClass', (data) => {
        swal({
          title: `The teacher just started the class with the code ${data[0].teacherCode}`,
          text: `Class of ${data[0].name} at ${data[0].start_time_sche} of ${data[0].weekday_sche}`,
          icon: 'info',
        });
      })  
  }, []);
  return <myContext.Provider value={{user, setUser, socket}}>{props.children}</myContext.Provider>;
}

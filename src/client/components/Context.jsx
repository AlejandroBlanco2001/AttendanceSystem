import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";
import addNotification from 'react-push-notification';
export const myContext = createContext({});
const socket = io(`http://${window.location.hostname}:80`)
export default function Context(props) {
  const [user, setUser] = useState();

useEffect(() => {
    axios
      .get("http://localhost:80/user/me", { withCredentials: true })
      .then((res) => {
        setUser(res.data); 
        socket.on("sendNotification", (data) => {
          setTimeout(() =>{
            console.log("entre" + res.data.id)
            socket.emit('checkMyClass',{code: data, id_pers:res.data.id})
          },3000)
        });
        socket.on('sendNotificationClass', (data) => {
          setTimeout(() => {
            addNotification({
              title: `The teacher just started the class with the code`,
              subtitle: 'Class Started',
              message: `Class of ${data[0].name} at ${data[0].start_time_sche} of ${data[0].weekday_sche}`,
              theme: 'red',
              duration: 10000,
              native: true
            });
          },3000)
        })
        // console.log(user);
      });

  }, []);
  return <myContext.Provider value={{user, setUser, socket}}>{props.children}</myContext.Provider>;
}

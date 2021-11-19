import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";
export const myContext = createContext({});
const socket = io(`http://${window.location.hostname}:80`)
export default function Context(props) {
  const [user, setUser] = useState();

useEffect(() => {
    axios
      .get("http://localhost:80/user/me", { withCredentials: true })
      .then((res) => {
        setUser(res.data);
        console.log(user);
      });
    socket.on("sendNotification", (data) => {
      console.log(user);
      console.table({code: data, id_pers:user.id_pers})
      socket.emit('checkMyClass',{code: data, id_pers:user.id_pers})
    });
    socket.on('sendNotificationClass', (data) => {
      console.table(data);
    })
  }, []);
  return <myContext.Provider value={{user, setUser, socket}}>{props.children}</myContext.Provider>;
}

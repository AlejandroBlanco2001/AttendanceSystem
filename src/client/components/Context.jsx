import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
export const myContext = createContext({});
export default function Context(props) {
  const [user, setUser] = useState();
  
useEffect(() => {
    axios
      .get("http://localhost:80/user/me", { withCredentials: true })
      .then((res) => {
        setUser(res.data);
        console.log(user);
      });
  }, []);
  return <myContext.Provider value={{user, setUser}}>{props.children}</myContext.Provider>;
}

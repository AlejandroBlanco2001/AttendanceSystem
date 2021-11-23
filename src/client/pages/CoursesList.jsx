import React, { useContext , useEffect, useState} from "react";
import MathIcon from "../assets/icons/math.png";
import ProgrammingIcon from "../assets/icons/programming.png";
import EthicsIcon from "../assets/icons/ethics.png";
import Navbar from "../components/Navbar";
import axios from "axios";
import CourseCard from "../components/CourseCard";
import { myContext } from "../components/Context";
const CoursesList = (props) => {
  const context = useContext(myContext);
  console.log("CONTEXT: ", context);
  const [classes, setClasses] =  useState([])
  const [userExists, setUserExists] = useState(false);

  useEffect(()=>{
    console.log("Fetching data from Courses list")
    axios.get("http://localhost:80/user/classes", {withCredentials: true}).then(response=> {
      console.log(response.data);
      setClasses(response.data);
      //name urlimage weekday_sche start_time_sc Nombre credits
      // schedule Friday|08:30:00|Monday/10:30:00
      setUserExists(true);
    }).catch(err => {
      console.error(new Error(err));
      setUserExists(false);
    })
},[userExists])



  return (
    <>
      <Navbar />
      <h1 class="courses-title">
        Welcome, <span>{context.user.name1 || "   "}</span>
      </h1>
      <h2 class="courses-subtitle">Courses list</h2>
      <main class="courses-container">
      {
        
        classes.map((myClass, index) => {
          const {name, urlimage, weekday_sche , start_time_sc, Nombre, credits, start_time_sche, code, subcode} = myClass;
          if(context){
            if(context.user.type == "1"){
              return(
                <CourseCard scode={subcode} icon = {urlimage} start_time_sche = {weekday_sche + ' at ' + start_time_sche} title = {name} teacher = {context.user.name1} credits = {credits} type = {(context.user.type?context.user.type:"0")} code = {code}/>
              )
            }else{
              return (
    
                  <CourseCard icon = {urlimage} start_time_sche = {start_time_sche} title = {name} teacher = {Nombre} credits = {credits} type = {(context.user.type?context.user.type:"0")} code = {code}/>
            
              )
            }

          }else{
           return(<></>)
          }
         
        })
      }
      </main>
    </>
  );
};

export default CoursesList;

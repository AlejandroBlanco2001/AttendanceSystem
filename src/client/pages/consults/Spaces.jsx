import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../../components/Table";
import "../../styles/table.css";

const Spaces= () => {
  const [isData, setIsData] = useState(false);
  const [spaces, setSpaces] = useState([]);
  const [updatedUser, setUpdatedSpace] = useState({})
  const [listaSpaces, setListaSpaces] = useState([]);
  const [needUpdate, setNeedUpdate] = useState(false);
  const [code_cour, setCodeCoursp]= useState(0);
  const [weekday_sche, setWeekdaySche]= useState("");
  const [start_time_sche, setStarTime]= useState("");
  const [code_clasR, setClasR]= useState("");

  const handleDeleteSpace = (space) => {
    deleteSpace([space.code, space.code_cour]);
  }

  const handleUpdateSpace = (space) => {
    setUpdatedSpace({});
    let inputs = document.getElementsByTagName("input");
    for (let index = 0; index < inputs.length; ++index) {
      inputs[index].value = ""
    }
    console.log("USER TO UPDATE: ", space);
    setUpdatedSpace(space);
  }
  const deleteSpace = (id) => {
    axios.post(`http://localhost:80/admin/delete/spaces/${id[0]}:${id[1]}`, { 1: true }, { withCredentials: true })
      .then((response) => {
        console.log("Eliminado correctamente");
        console.log("RESPONSE: ", response);
        window.location.reload(true);
        reload();
      })
      .catch((err) => {
        console.log("ERROR ELIMINANDO");
        console.log(err);
      });
  };

  const updateSpace = () => {
    axios.post(`http://localhost:80/admin/update/spaces/${updatedUser.code}:${updatedUser.code_cour}`, {
      code_cour: code_cour|| updatedUser.code_cour,
      weekday_sche: weekday_sche|| updatedUser.weekday_sche,
      start_time_sche: start_time_sche || updatedUser.start_time_sche,
      code_clasR: code_clasR || updatedUser.code_clasR,
    }, { withCredentials: true }).then((response) => {
      window.location.reload(true);
      reload();
    });
  };

  const addSpace = () => {
    axios.post("http://localhost:80/admin/create/spaces", {
     code_cour,
      weekday_sche,
      start_time_sche,
      code_clasR,
    })
      .then((response) => {
        console.log("Success");
        setListaSpaces([
          ...listaSpaces,
          {
            code_cour,
            weekday_sche,
            start_time_sche,
            code_clasR,
          },
        ]);
        window.location.reload(false);
      })
      .catch((er) =>{
        alert("You`re trying to add a space whose primary key is already in existance.")
        console.log(er)
      });
  };

useEffect(() => {
  axios
  .get("http://localhost:80/admin/spaces", { withCredentials: true })
  .then((res) => {
    console.log("DATA FROM ADMIN: ", res.data);
    setIsData(true);
    setSpaces(res.data)
  });

}, [isData])

const sendInfo = (e) => {
  console.log("Procesando registro");
  e.preventDefault();
  addSpace();
};


 return (
 <main className="main-users">
 <form onSubmit={sendInfo}>
          <img  alt="" />
          <div className="form-block">
            <label htmlFor="code_cour">Course's Code</label>
            <input className="row-form"
              type="text"
              id="code_cour"
              value={code_cour || "" || updatedUser.code_cour}
              placeholder="type the code of the Course"
              onChange={(e)=>setCodeCoursp(e.target.value)}
              name="codeCr"
            />
          </div>
          <div className="form-block">
            <label htmlFor="weekday_sche">Weekday</label>
            <select
              type="text"
              placeholder="type the day of the week"
              id="weekday_sche"
              value={weekday_sche || "" || updatedUser.weekday_sche}
              onChange={(e)=>setWeekdaySche(e.target.value)}
              name="code_weekday_sche"
            >
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>

            </select>
          </div>
          <div className="form-block">
            <label htmlFor="start_time_sche">Start Time</label>
            <input className="row-form"
              type="text"
              placeholder="type the start time"
              id="start_time_sche"
              value={start_time_sche || "" || updatedUser.start_time_sche}
              onChange={(e)=>setStarTime(e.target.value)}
              name="start_time_sche"
            />
          </div>
          <div className="form-block">
            <label htmlFor="code_clasR">Classroom's Code</label>
            <input className="row-form"
              type="text"
              placeholder="type the code fo the classroom"
              id="code_clasR"
              value={code_clasR || "" || updatedUser.code_clasR}
              onChange={(e)=>setClasR(e.target.value)}
              name="code_clasR"
            />
          </div>
          <input 
            type="submit"
            className="button primary-button button-row"
            value="ADD"
          />
          <button
           className="button secondary-button button-row"
          onClick={updateSpace}
          type="button"
        >
        UPDATE
        </button>
        </form>  
        
    <div className="table">
        <Table
          tableheads={[
            "ID",
            "Course's Code",
            "Weekday",
            "Start time",
            "Classroom Code",
            "Actions"
          ]}
          data={isData?spaces:null}
          setNeedUpdate={setNeedUpdate}
          handleDeleteElement={handleDeleteSpace}
          handleUpdateElement={handleUpdateSpace}
        />
    </div>
    </main>

 )}

export default Spaces;
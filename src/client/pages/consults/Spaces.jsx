import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../../components/Table";
import "../../styles/table.css";

const Spaces= () => {
  const [isData, setIsData] = useState(false);
  const [spaces, setSpaces] = useState([]);
  const [updatedUser, setUpdatedUser] = useState({})
  const [listaSpaces, setListaSpaces] = useState([]);
  const [needUpdate, setNeedUpdate] = useState(false);
  const [code_cour, setCodeCoursp]= useState(0);
  const [weekday_sche, setWeekdaySche]= useState("");
  const [start_time_sche, setStarTime]= useState("");
  const [code_clasR, setClasR]= useState("");


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
        alert("Disculpe esta ingresando un usuario ya existente")
        console.log(er)
      });
  };


  // const deletePadre = (cedula) => {
  //   Axios.delete(`http://localhost:3004/deletepadre/${cedula}`)
  //     .then((response) => {
  //       console.log("Eliminado correctamente");
  //       window.location.reload(false);
  //     })
  //     .catch((err) => {
  //       console.log("ERROR ELIMINANDO");
  //       console.log(err);
  //     });
  // };

  // const updateUser = () => {
  //   Axios.put("http://localhost:3004/update", {
  //     username: username|| updatedUser.username,
  //     passcode: passcode || updatedUser.passcode,
  //     urlimage: urlimage || updatedUser.urlimage,
  //     id_person: id_person || updatedUser.id_person,
  //     // Se necesita en caso de que el usuario cambie la cedula en el input o para comparar la informacion actual con la anterior
  //   }).then((response) => {
  //     window.location.reload(false);
  //     reload();
  //   });
  // };

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
 <main>
 <form action="" className="login-form" onSubmit={sendInfo}>
          <img  alt="" />
          <div className="form-block">
            <label htmlFor="code_cour">Course's Code</label>
            <input
              type="texte"
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
              type="texte"
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
            <input
              type="texte"
              placeholder="type the start time"
              id="start_time_sche"
              value={start_time_sche || "" || updatedUser.start_time_sche}
              onChange={(e)=>setStarTime(e.target.value)}
              name="start_time_sche"
            />
          </div>
          <div className="form-block">
            <label htmlFor="code_clasR">Classroom's Code</label>
            <input
              type="texte"
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
           className="button primary-button button-row"
          // onClick={updateUser}
          disabled={!needUpdate}
          type="button"
        >
        ACTUALIZAR
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
          handleDeleteUser={null}
          handleUpdateUser={null}
        />
    </div>
    </main>

 )}

export default Spaces;
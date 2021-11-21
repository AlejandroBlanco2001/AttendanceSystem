import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../../components/Table";
import "../../styles/table.css";

const Schedules= () => {
  const [isData, setIsData] = useState(false);
  const [schedules, setSchedules] = useState([]);
  const [updatedUser, setUpdatedUser] = useState({})
  const [listaSchedules, setListaSchudeles] = useState([]);
  const [needUpdate, setNeedUpdate] = useState(false);
  const [weekday, setWeekday]= useState("");
  const [start_timeSch, setStartTimeSch]= useState("");
  const [durationSch, setDurationSch]= useState("");



//   const addUser = () => {
//     axios.post("http://localhost:80/admin/create/users", {
//       username,
//       passcode,
//       id_person,
//     })
//       .then((response) => {
//         console.log("Success");
//         setListaUsers([
//           ...listaUsers,
//           {
//             username,
//             passcode,
//             id_person,
//           },
//         ]);
//         window.location.reload(false);
//       })
//       .catch((er) =>{
//         alert("Disculpe esta ingresando un usuario ya existente")
//         console.log(er)
//       });
//   };


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
  .get("http://localhost:80/admin/schedules", { withCredentials: true })
  .then((res) => {
    console.log("DATA FROM ADMIN: ", res.data);
    setIsData(true);
    setSchedules(res.data)
  });

}, [isData])

const sendInfo = (e) => {
  console.log("Procesando registro");
  e.preventDefault();
//   addUser();
};


 return (
 <main>
 <form action="" className="login-form" onSubmit={sendInfo}>
          <img  alt="" />
          <div className="form-block">
            <label htmlFor="weekday">Weekday</label>
            <input
              type="text"
              id="weekday"
              value={weekday || "" || updatedUser.weekday}
              placeholder="type the day of the week"
              onChange={(e)=>setWeekday(e.target.value)}
              name="weekday"
            />
          </div>
          <div className="form-block">
            <label htmlFor="start_timeSch">Start time</label>
            <input
              type="text"
              placeholder="type the Start Time"
              id="start_timeSch"
              value={start_timeSch || "" || updatedUser.start_timeSch}
              onChange={(e)=>setWeekdaySche(e.target.value)}
              name="start_timeSch"
            />
          </div>
          <div className="form-block">
            <label htmlFor="duration">Duration</label>
            <input
              type="text"
              placeholder="type the Duration of the class"
              id="duration"
              value={durationSch|| "" || updatedUser.durationSch}
              onChange={(e)=>setDurationSch(e.target.value)}
              name="durationSch"
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
            "Weekday",
            "Start time",
            "Duration",
            "End time",
            "Accions"
          ]}
          data={isData?schedules:null}
          setNeedUpdate={setNeedUpdate}
          handleDeleteUser={null}
          handleUpdateUser={null}
        />
    </div>
    </main>

 )}

export default Schedules;
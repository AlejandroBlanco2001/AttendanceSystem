import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../../components/Table";
import "../../styles/table.css";

const Spaces= () => {
  const [isData, setIsData] = useState(false);
  const [spaces, setSpaces] = useState([]);
  const [updatedUser, setUpdatedUser] = useState({})
  const [listaCourses, setListaCoursees] = useState([]);
  const [needUpdate, setNeedUpdate] = useState(false);
  const [code_courSp, setCodeCoursp]= useState(0);
  const [weekday_sche, setWeekdaySche]= useState("");
  const [start_time_sche, setStarTime]= useState("");
  const [code_clasR, setClasR]= useState("");


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
  .get("http://localhost:80/admin/courses", { withCredentials: true })
  .then((res) => {
    console.log("DATA FROM ADMIN: ", res.data);
    setIsData(true);
    setSpaces(res.data)
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
            <label htmlFor="code_courSp">Course's Code</label>
            <input
              type="text"
              id="code_courSp"
              value={code_courSp || "" || updatedUser.code_courSp}
              placeholder="type the code of the Course"
              onChange={(e)=>setCodeCoursp(e.target.value)}
              name="codeCr"
            />
          </div>
          <div className="form-block">
            <label htmlFor="weekday_sche">Weekday</label>
            <input
              type="text"
              placeholder="type the day of the week"
              id="weekday_sche"
              value={weekday_sche || "" || updatedUser.weekday_sche}
              onChange={(e)=>setWeekdaySche(e.target.value)}
              name="code_weekday_sche"
            />
          </div>
          <div className="form-block">
            <label htmlFor="start_time_sche">Start Time</label>
            <input
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
            <input
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
            "Course's Code",
            "Weekday",
            "Start time",
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
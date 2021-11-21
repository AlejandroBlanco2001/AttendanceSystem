import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../../components/Table";
import "../../styles/table.css";

const Program= () => {
  const [isData, setIsData] = useState(false);
  const [programs, setPrograms] = useState([]);
  const [updatedUser, setUpdatedUser] = useState({})
  const [listaPrograms, setListaPrograms] = useState([]);
  const [needUpdate, setNeedUpdate] = useState(false);
  const [snies, setSNIES]= useState("");
  const [nameProg, setNameProg]= useState("");
  const [typeProg, setTypeProg]= useState("");
  const [title, setTitle]= useState("");
  const [duration, setDuration]= useState("");
  const [creditsProg, setCreditsProg]= useState("");
  const [id_deptProg, setIdDeptProg]= useState("");








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
  .get("http://localhost:80/admin/programs", { withCredentials: true })
  .then((res) => {
    console.log("DATA FROM ADMIN: ", res.data);
    setIsData(true);
    setPrograms(res.data)
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
            <label htmlFor="snies">SNIES</label>
            <input
              type="text"
              id="snies"
              value={snies || "" || updatedUser.snies}
              placeholder="type the SNIES"
              onChange={(e)=>setSNIES(e.target.value)}
              name="snies"
            />
          </div>
          <div className="form-block">
            <label htmlFor="nameProg">Program's Name</label>
            <input
              type="text"
              placeholder="type the name of the program"
              id="nameProg"
              value={nameProg || "" || updatedUser.nameProg}
              onChange={(e)=>setNameProg(e.target.value)}
              name="nameProg"
            />
          </div>
          <div className="form-block">
            <label htmlFor="typeProg">Program type</label>
            <input
              type="text"
              placeholder="type the type of program"
              id="typeProg"
              value={typeProg || "" || updatedUser.typeProg}
              onChange={(e)=>setTypeProg(e.target.value)}
              name="typeProg"
            />
          </div>
          <div className="form-block">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              placeholder="type the title of the program"
              id="title"
              value={title || "" || updatedUser.title}
              onChange={(e)=>setTitle(e.target.value)}
              name="title"
            />
          </div>
          <div className="form-block">
            <label htmlFor="duration">Duration</label>
            <input
              type="text"
              placeholder="type the duration of the program"
              id="duration"
              value={duration || "" || updatedUser.duration}
              onChange={(e)=>setDuration(e.target.value)}
              name="duration"
            />
          </div>
          <div className="form-block">
            <label htmlFor="id_deptProg">Deparment's ID</label>
            <input
              type="text"
              placeholder="type the ID of the program"
              id="id_deptProg"
              value={id_deptProg || "" || updatedUser.id_deptProg}
              onChange={(e)=>setIdDeptProg(e.target.value)}
              name="id_deptProg"
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
            "SNIES",
            "Program's Name",
            "Program Type",
            "Title",
            "Duration",
            "Credits",
            "Deparment's ID",
            "Actions"
          ]}
          data={isData?programs:null}
          setNeedUpdate={setNeedUpdate}
          handleDeleteUser={null}
          handleUpdateUser={null}
        />
    </div>
    </main>

 )}

export default Program;
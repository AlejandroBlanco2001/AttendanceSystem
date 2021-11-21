import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../../components/Table";
import "../../styles/table.css";

const Classroom= () => {
  const [isData, setIsData] = useState(false);
  const [classrooms, setClassrooms] = useState([]);
  const [updatedUser, setUpdatedUser] = useState({})
  const [listaClassrooms, setListaClassrooms] = useState([]);
  const [needUpdate, setNeedUpdate] = useState(false);
  const [codeClr, setCodeClr]= useState("");
  const [typeClr, setTypeClr]= useState("");


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
  .get("http://localhost:80/admin/classrooms", { withCredentials: true })
  .then((res) => {
    console.log("DATA FROM ADMIN: ", res.data);
    setIsData(true);
    setClassrooms(res.data)
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
            <label htmlFor="codeClr">Code Classroom</label>
            <input
              type="text"
              id="codeClr"
              value={codeClr || "" || updatedUser.codeClr}
              placeholder="type the code of the Classroom"
              onChange={(e)=>setCodeClr(e.target.value)}
              name="codeClr"
            />
          </div>
          <div className="form-block">
            <label htmlFor="typeClr">Type Classroom</label>
            <input
              type="text"
              placeholder="type the type classroom"
              id="typeClr"
              value={typeClr || "" || updatedUser.typeClr}
              onChange={(e)=>setTypeClr(e.target.value)}
              name="typeClr"
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
            "Code Classroom",
            "Type Classroom",
            "Accions"
          ]}
          data={isData?classrooms:null}
          setNeedUpdate={setNeedUpdate}
          handleDeleteUser={null}
          handleUpdateUser={null}
        />
    </div>
    </main>

 )}

export default Classroom;
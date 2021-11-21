import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../../components/Table";
import "../../styles/table.css";

const EnrollmentCourses= () => {
  const [isData, setIsData] = useState(false);
  const [enrollmentcourses, setEnrollmentCourses] = useState([]);
  const [updatedUser, setUpdatedUser] = useState({})
  const [listaEnrollmentCourses, setListaEnrollmentCourses] = useState([]);
  const [needUpdate, setNeedUpdate] = useState(false);
  const [code_courEc, setCodeCour]= useState("");
  const [id_enro, setIdEnro]= useState("");


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
  .get("http://localhost:80/admin/enrollmentCourses", { withCredentials: true })
  .then((res) => {
    console.log("DATA FROM ADMIN: ", res.data);
    setIsData(true);
    setEnrollmentCourses(res.data)
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
            <label htmlFor="code_cour">Code Course Enrollment</label>
            <input
              type="text"
              id="code_cour"
              value={code_cour || "" || updatedUser.code_cour}
              placeholder="type the code of the Course Enrollment"
              onChange={(e)=>setCodeCour(e.target.value)}
              name="code"
            />
          </div>
          <div className="form-block">
            <label htmlFor="id_enro">ID Enrollment</label>
            <input
              type="text"
              placeholder="type the ID Enrollment"
              id="id_enro"
              value={id_enro || "" || updatedUser.id_enro}
              onChange={(e)=>setIdEnro(e.target.value)}
              name="id_enro"
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
            "Code Course Enrollment",
            "Id Enrollment",
            "Accions"
          ]}
          data={isData?enrollmentcourses:null}
          setNeedUpdate={setNeedUpdate}
          handleDeleteUser={null}
          handleUpdateUser={null}
        />
    </div>
    </main>

 )}

export default EnrollmentCourses;
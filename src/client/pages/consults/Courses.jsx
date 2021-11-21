import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../../components/Table";
import "../../styles/table.css";

const Course= () => {
  const [isData, setIsData] = useState(false);
  const [courses, setCourses] = useState([]);
  const [updatedUser, setUpdatedUser] = useState({})
  const [listaCourses, setListaCoursees] = useState([]);
  const [needUpdate, setNeedUpdate] = useState(false);
  const [codeCr, setCodeCr]= useState(0);
  const [code_subjCr, setCodeSubjCr]= useState("");
  const [id_teach, setIdTeach]= useState("");


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
    setCourses(res.data)
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
            <label htmlFor="codeCr">Course's Code</label>
            <input
              type="text"
              id="codeCr"
              value={codeCr || "" || updatedUser.codeCr}
              placeholder="type the code of the Course"
              onChange={(e)=>setCodeCr(e.target.value)}
              name="codeCr"
            />
          </div>
          <div className="form-block">
            <label htmlFor="code_subjCr">Subject's Code</label>
            <input
              type="text"
              placeholder="type the code of the subject"
              id="code_subjCr"
              value={code_subjCr || "" || updatedUser.code_subjCr}
              onChange={(e)=>setName(e.target.value)}
              name="code_subjCr"
            />
          </div>
          <div className="form-block">
            <label htmlFor="id_teach">Teacher's ID</label>
            <input
              type="text"
              placeholder="type the ID of the teacher"
              id="id_teach"
              value={id_teach || "" || updatedUser.id_teach}
              onChange={(e)=>setName(e.target.value)}
              name="id_teach"
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
            "Subject's Code",
            "Teacher ID",
            "Actions"
          ]}
          data={isData?courses:null}
          setNeedUpdate={setNeedUpdate}
          handleDeleteUser={null}
          handleUpdateUser={null}
        />
    </div>
    </main>

 )}

export default Course;
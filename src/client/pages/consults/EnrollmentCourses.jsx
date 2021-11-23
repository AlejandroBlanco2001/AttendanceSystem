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
  const [code_cour, setCodeCour]= useState();
  const [id_enro, setIdEnro]= useState();


  const addEnrollmentCourse = () => {
    axios.post("http://localhost:80/admin/create/enrollmentCourses", {
      code_cour,
      id_enro,
    })
      .then((response) => {
        console.log("Success");
        setListaEnrollmentCourses([
          ...listaEnrollmentCourses,
          {
            code_cour,
            id_enro,
          },
        ]);
        window.location.reload(false);
      })
      .catch((er) =>{
        alert("You`re trying to add a Course_Enrollment relation whose primary key is already in existance.")
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
  addEnrollmentCourse();
};


 return (
 <main>
 <form action="" className="login-form" onSubmit={sendInfo}>
          <img  alt="" />
          <div className="form-block">
            <label htmlFor="code_cour">Course's Code</label>
            <input
              type="text"
              id="code_cour"
              value={code_cour || null || updatedUser.code_cour}
              placeholder="type the code of the Course"
              onChange={(e)=>setCodeCour(e.target.value)}
              name="code"
            />
          </div>
          <div className="form-block">
            <label htmlFor="id_enro">Enrollment's ID</label>
            <input
              type="text"
              placeholder="type the ID of the Enrollment"
              id="id_enro"
              value={id_enro || null || updatedUser.id_enro}
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
           className="button secondary-button button-row"
          // onClick={updateUser}
          disabled={!needUpdate}
          type="button"
        >
        UPDATE
        </button>
        </form>  
        
    <div className="table">
        <Table
          tableheads={[
            "Course's Code",
            "Enrollment's ID",
            "Studying",
            "Completed",
            "Actions"
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
import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../../components/Table";
import "../../styles/table.css";

const EnrollmentCourses= () => {
  const [isData, setIsData] = useState(false);
  const [enrollmentcourses, setEnrollmentCourses] = useState([]);
  const [updatedUser, setUpdatedEnrollmentCourse] = useState({})
  const [listaEnrollmentCourses, setListaEnrollmentCourses] = useState([]);
  const [needUpdate, setNeedUpdate] = useState(false);
  const [code_cour, setCodeCour]= useState();
  const [id_enro, setIdEnro]= useState();

  const handleDeleteEnrollmentCourse = (erc) => {
    deleteEnrollmentCourse([erc.code,erc.id_enro]);
  }

  const handleUpdateEnrollmentCourse = (erc) => {
    setUpdatedEnrollmentCourse({});
    let inputs = document.getElementsByTagName("input");
    for (let index = 0; index < inputs.length; ++index) {
      inputs[index].value = ""
    }
    console.log("USER TO UPDATE: ", erc);
    setUpdatedEnrollmentCourse(erc);
  } 
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

  const deleteEnrollmentCourse = (id) => {
    axios.post(`http://localhost:80/admin/delete/enrollmentCourses/${id[0]}:${id[1]}`, { 1: true }, { withCredentials: true })
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

  const updateEnrollmentCourse = () => {
    axios.post(`http://localhost:80/admin/update/subjects/${updatedUser.code_cour}:${updatedUser.id_enro}`, {
      code_cour: code_cour|| updatedUser.code_cour,
      id_enro: id_enro || updatedUser.id_enro,
    }, { withCredentials: true }).then((response) => {
      window.location.reload(true);
      reload();
    });
  };
  

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
 <main className="main-users">
 <form onSubmit={sendInfo}>
          <img  alt="" />
          <div className="form-block">
            <label htmlFor="code_cour">Course's Code</label>
            <input className="row-form"
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
            <input className="row-form"
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
           className="button primary-button button-row"
           onClick={updateEnrollmentCourse}         
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
          handleDeleteElement={handleDeleteEnrollmentCourse}
          handleUpdateElement={handleUpdateEnrollmentCourse}
        />
    </div>
    </main>

 )}

export default EnrollmentCourses;
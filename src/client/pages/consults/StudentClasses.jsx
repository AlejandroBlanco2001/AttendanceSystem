import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../../components/Table";
import "../../styles/table.css";

const studentClasses= () => {
  const [isData, setIsData] = useState(false);
  const [studentClasses, setStudentClasses] = useState([]);
  const [updatedUser, setUpdatedUser] = useState({})
  const [listaStudentsClasses, setListaStudentClasses] = useState([]);
  const [needUpdate, setNeedUpdate] = useState(false);
  const [code_clas, setCodeClass]= useState("");
  const [id_stud, setIdStudCl]= useState("");
  const [attendance, setAttendence]= useState("");

  const handleDeleteStudentClass = (stc) => {
    deleteStudentClass(stc.code_clas, stc.id_stud);
  }

  const handleUpdateStudentClass = (stc) => {
    setUpdatedStudentClass({});
    let inputs = document.getElementsByTagName("input");
    for (let index = 0; index < inputs.length; ++index) {
      inputs[index].value = ""
    }
    console.log("USER TO UPDATE: ", stc);
    setUpdatedStudentClass(stc);
  }


  const addStudentClass = () => {
    axios.post("http://localhost:80/admin/create/studentClasses", {
      code_clas,
      id_stud,
      attendance,
    }, { withCredentials: true })
      .then((response) => {
        console.log("Success");
        setListaStudentClasses([
          ...listaStudentsClasses,
          {
            code_clas,
            id_stud,
            attendance,
          },
        ]);
        window.location.reload(false);
      })
      .catch((er) =>{
        alert("You`re trying to add a Student_Class relation whose primary key is already in existance.")
        console.log(er)
      });
  };


 
  const deleteStudentClass = (id) => {
    axios.post(`http://localhost:80/admin/delete/studentClasses/${id[0]}|${id[1]}`, { 1: true }, { withCredentials: true })
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

  const updateStudentClass = () => {
    axios.post(`http://localhost:80/admin/update/studentClasses/${updatedUser.code_clas}|${updatedUser.id_stud}`, {
      code_clas: code_clas|| updatedUser.code_clas,
      id_stud: id_stud || updatedUser.id_stud,
      attendance: attendance || updatedUser.attendance
    }, { withCredentials: true }).then((response) => {
      window.location.reload(true);
      reload();
    });
  };

useEffect(() => {
  axios
  .get("http://localhost:80/admin/studentClasses", { withCredentials: true })
  .then((res) => {
    console.log("DATA FROM ADMIN: ", res.data);
    setIsData(true);
    setStudentClasses(res.data)
  });

}, [isData])

const sendInfo = (e) => {
  console.log("Procesando registro");
  e.preventDefault();
 addStudentClass();
};


 return (
 <main className="main-users">
 <form onSubmit={sendInfo}>
          <img  alt="" />
          <div className="form-block">
            <label htmlFor="code_clas">Class's Code</label>
            <input className="row-form"
              type="text"
              id="code_clas"
              value={code_clas || "" || updatedUser.code_clas}
              placeholder="type the code of the Class"
              onChange={(e)=>setCodeClass(e.target.value)}
              name="code_clas"
            />
          </div>
          <div className="form-block">
            <label htmlFor="id_stud">Student's ID</label>
            <input className="row-form"
              type="text"
              placeholder="type the ID"
              id="id_stud"
              value={id_stud || "" || updatedUser.id_stud}
              onChange={(e)=>setIdStudCl(e.target.value)}
              name="name"
            />
          </div>
          <div className="form-block">
            <label htmlFor="attendance">Attendance</label>
            <input className="row-form"
              type="text"
              placeholder="type the ID"
              id="attendance"
              value={attendance || "" || updatedUser.attendance}
              onChange={(e)=>setAttendence(e.target.value)}
              name="attendance"
            />
          </div>
          <input 
            type="submit"
            className="button primary-button button-row"
            value="ADD"
          />
          <button
           className="button secondary-button button-row"
          onClick={updateStudentClass}
          type="button"
        >
        UPDATE
        </button>
        </form>  
        
    <div className="table">
        <Table
          tableheads={[
            "Class' Code",
            "Student's ID",
            "Attendance",
            "Actions"
          ]}
          data={isData?studentClasses:null}
          setNeedUpdate={setNeedUpdate}
          handleDeleteElement={handleDeleteStudentClass}
          handleUpdateElement={handleUpdateStudentClass}
        />
    </div>
    </main>

 )}

export default studentClasses;
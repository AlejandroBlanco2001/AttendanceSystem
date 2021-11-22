import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../../components/Table";
import "../../styles/table.css";

const Course= () => {
  const [isData, setIsData] = useState(false);
  const [courses, setCourses] = useState([]);
  const [updatedUser, setUpdatedUser] = useState({})
  const [listaCourses, setListaCourses] = useState([]);
  const [needUpdate, setNeedUpdate] = useState(false);
  const [code, setCodeCr]= useState("");
  const [code_subj, setCodeSubjCr]= useState("");
  const [id_teach, setIdTeach]= useState("");


  const addCourse = () => {
    axios.post("http://localhost:80/admin/create/courses", {
      code,
      code_subj,
      id_teach,
    })
      .then((response) => {
        console.log("Success");
        setListaCourses([
          ...listaCourses,
          {
              code,
              code_subj,
              id_teach,
          },
        ]);
        window.location.reload(false);
      })
      .catch((er) =>{
        alert("You`re trying to add a course whose primary key is already in existance.")
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
  addCourse();
};


 return (
 <main>
 <form action="" className="login-form" onSubmit={sendInfo}>
          <img  alt="" />
          <div className="form-block">
            <label htmlFor="code">Course's Code</label>
            <input
              type="texte"
              id="code"
              value={code|| "" || updatedUser.code}
              placeholder="type the code of the Course"
              onChange={(e)=>setCodeCr(e.target.value)}
              name="code"
            />
          </div>
          <div className="form-block">
            <label htmlFor="code_subj">Subject's Code</label>
            <input
              type="texte"
              placeholder="type the code of the subject"
              id="code_subj"
              value={code_subj || "" || updatedUser.code_subj}
              onChange={(e)=>setCodeSubjCr(e.target.value)}
              name="code_subj"
            />
          </div>
          <div className="form-block">
            <label htmlFor="id_teach">Teacher's ID</label>
            <input
              type="texte"
              placeholder="type the ID of the teacher"
              id="id_teach"
              value={id_teach || "" || updatedUser.id_teach}
              onChange={(e)=>setIdTeach(e.target.value)}
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
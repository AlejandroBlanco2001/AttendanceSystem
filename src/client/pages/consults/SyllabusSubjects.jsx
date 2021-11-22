import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../../components/Table";
import "../../styles/table.css";

const syllabusSubjects= () => {
  const [isData, setIsData] = useState(false);
  const [syllabusSubjects, setSyllabusSubjects] = useState([]);
  const [updatedUser, setUpdatedUser] = useState({})
  const [listaSyllabusSubjects, setListaSyllabusSubjects] = useState([]);
  const [needUpdate, setNeedUpdate] = useState(false);
  const [code_subj, setCodeSubj]= useState("");
  const [code_syll, setCodeSyll]= useState("");
  const [semester, setSemester]= useState("");



  const addSyllabuSubject = () => {
    axios.post("http://localhost:80/admin/create/syllabusSubjects", {
      code_subj,
      code_syll,
      semester,
    })
      .then((response) => {
        console.log("Success");
        setListaSyllabusSubjects([
          ...listaSyllabusSubjects,
          {
            code_subj,
            code_syll,
            semester,
          },
        ]);
        window.location.reload(false);
      })
      .catch((er) =>{
        alert("Disculpe esta ingresando un usuario ya existente")
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
  .get("http://localhost:80/admin/syllabusSubjects", { withCredentials: true })
  .then((res) => {
    console.log("DATA FROM ADMIN: ", res.data);
    setIsData(true);
    setSyllabusSubjects(res.data)
  });

}, [isData])

const sendInfo = (e) => {
  console.log("Procesando registro");
  e.preventDefault();
  addSyllabuSubject();
};


 return (
 <main>
 <form action="" className="login-form" onSubmit={sendInfo}>
          <img  alt="" />
          <div className="form-block">
            <label htmlFor="code_subj">Subject's Code</label>
            <input
              type="texte"
              id="code_subj"
              value={code_subj || "" || updatedUser.code_subj}
              placeholder="type the code of the Subject"
              onChange={(e)=>setCodeSubj(e.target.value)}
              name="code_subj"
            />
          </div>
          <div className="form-block">
            <label htmlFor="code_syll">Syllabus's Code</label>
            <input
              type="texte"
              placeholder="type the code of the syllabus"
              id="code_syll"
              value={code_syll || "" || updatedUser.code_syll}
              onChange={(e)=>setCodeSyll(e.target.value)}
              name="code_syll"
            />
          </div>
          <div className="form-block">
            <label htmlFor="semester">Semester</label>
            <input
              type="texte"
              placeholder="type the Semester"
              id="semester"
              value={semester || "" || updatedUser.semester}
              onChange={(e)=>setSemester(e.target.value)}
              name="semester"
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
            "Subject's Code",
            "Syllabus' Code",
            "Semester",
            "Actions"
          ]}
          data={isData?syllabusSubjects:null}
          setNeedUpdate={setNeedUpdate}
          handleDeleteUser={null}
          handleUpdateUser={null}
        />
    </div>
    </main>

 )}

export default syllabusSubjects;

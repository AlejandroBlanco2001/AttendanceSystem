import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../../components/Table";
import "../../styles/table.css";

const syllabusSubjects= () => {
  const [isData, setIsData] = useState(false);
  const [syllabusSubjects, setSyllabusSubjects] = useState([]);
  const [updatedUser, setUpdatedSyllabusSubject] = useState({})
  const [listaSyllabusSubjects, setListaSyllabusSubjects] = useState([]);
  const [needUpdate, setNeedUpdate] = useState(false);
  const [code_subj, setCodeSubj]= useState("");
  const [code_syll, setCodeSyll]= useState("");
  const [semester, setSemester]= useState("");

  const handleDeleteSyllabusSubjecet = (sys) => {
    deleteSyllabusSubject([sys.code_subj, sys.code_syll]);
  }

  const handleUpdateSyllabusSubject= (sys) => {
    setUpdatedSyllabusSubject({});
    let inputs = document.getElementsByTagName("input");
    for (let index = 0; index < inputs.length; ++index) {
      inputs[index].value = ""
    }
    console.log("USER TO UPDATE: ", sys);
    setUpdatedSyllabusSubject(sys);
  }

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
        alert("You`re trying to add a Syllabus_Subject relation whose primary key is already in existance.")
        console.log(er)
      });
  };

  const deleteSyllabusSubject = (id) => {
    axios.post(`http://localhost:80/admin/delete/syllabusSubjects/${id[0]}:${id[1]}`, { 1: true }, { withCredentials: true })
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

  const updateSubject = () => {
    axios.post(`http://localhost:80/admin/update/syllabusSubjects/${updatedUser.code_subj}:${updatedUser.code_syll}`, {
      code_subj: code_subj || updatedUser.code_subj,
      code_syll: code_syll || updatedUser.code_syll,
      semester: semester || updatedUser.semester,
    }, { withCredentials: true }).then((response) => {
      window.location.reload(true);
      reload();
    });
  };

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
 <main className="main-users">
 <form onSubmit={sendInfo}>
          <img  alt="" />
          <div className="form-block">
            <label htmlFor="code_subj">Subject's Code</label>
            <input className="row-form"
              type="text"
              id="code_subj"
              value={code_subj || "" || updatedUser.code_subj}
              placeholder="type the code of the Subject"
              onChange={(e)=>setCodeSubj(e.target.value)}
              name="code_subj"
            />
          </div>
          <div className="form-block">
            <label htmlFor="code_syll">Syllabus's Code</label>
            <input className="row-form"
              type="text"
              placeholder="type the code of the syllabus"
              id="code_syll"
              value={code_syll || "" || updatedUser.code_syll}
              onChange={(e)=>setCodeSyll(e.target.value)}
              name="code_syll"
            />
          </div>
          <div className="form-block">
            <label htmlFor="semester">Semester</label>
            <input className="row-form"
              type="text"
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
           className="button secondary-button button-row"
          onClick={updateSubject}
          type="button"
        >
          UPDATE
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
          handleDeleteElement={handleDeleteSyllabusSubjecet}
          handleUpdateElement={handleUpdateSyllabusSubject}
        />
    </div>
    </main>

 )}

export default syllabusSubjects;

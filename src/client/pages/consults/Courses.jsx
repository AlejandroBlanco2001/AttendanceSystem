import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../../components/Table";
import "../../styles/table.css";

const Course= () => {
  const [isData, setIsData] = useState(false);
  const [courses, setCourses] = useState([]);
  const [updatedUser, setUpdatedCourse] = useState({})
  const [listaCourses, setListaCourses] = useState([]);
  const [needUpdate, setNeedUpdate] = useState(false);
  const [code, setCodeCr]= useState("");
  const [code_subj, setCodeSubjCr]= useState("");
  const [id_teach, setIdTeach]= useState("");


  const handleDeleteCourse = (course) => {
    deleteCourse(course.code);
  }

  const handleUpdateCourse = (course) => {
    setUpdatedCourse({});
    let inputs = document.getElementsByTagName("input");
    for (let index = 0; index < inputs.length; ++index) {
      inputs[index].value = ""
    }
    console.log("USER TO UPDATE: ", course);
    setUpdatedCourse(course);
  }


  const deleteCourse = (id) => {
    axios.post(`http://localhost:80/admin/delete/courses/${id}`, { 1: true }, { withCredentials: true })
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

  const updateCourse = () => {
    console.log(updatedUser);
    axios.post(`http://localhost:80/admin/update/courses/${updatedUser.code}`, {
      code: code|| updatedUser.code,
      code_subj: code_subj || updatedUser.code_subj,
      id_teach: id_teach || updatedUser.id_teach,
    }, { withCredentials: true }).then((response) => {
      window.location.reload(true);
      reload();
    });
  };
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
 <main className="main-users">
 <form  onSubmit={sendInfo}>
          <img  alt="" />
          <div className="form-block">
            <label htmlFor="code">Course's Code</label>
            <input className="row-form"
              type="text"
              id="code"
              value={code|| "" || updatedUser.code}
              placeholder="type the code of the Course"
              onChange={(e)=>setCodeCr(e.target.value)}
              name="code"
            />
          </div>
          <div className="form-block">
            <label htmlFor="code_subj">Subject's Code</label>
            <input className="row-form"
              type="text"
              placeholder="type the code of the subject"
              id="code_subj"
              value={code_subj || "" || updatedUser.code_subj}
              onChange={(e)=>setCodeSubjCr(e.target.value)}
              name="code_subj"
            />
          </div>
          <div className="form-block">
            <label htmlFor="id_teach">Teacher's ID</label>
            <input className="row-form"
              type="text"
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
           className="button secondary-button button-row"
          onClick={updateCourse}
          type="button"
        >
        UPDATE
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
          handleDeleteElement={handleDeleteCourse}
          handleUpdateElement={handleUpdateCourse}
        />
    </div>
    </main>

 )}

export default Course;
import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../../components/Table";
import "../../styles/table.css";

const Enrollment= () => {
  const [isData, setIsData] = useState(false);
  const [enrollments, setEnrollments] = useState([]);
  const [updatedUser, setUpdatedEnrollment] = useState({})
  const [listaEnrollments, setListaEnrollments] = useState([]);
  const [needUpdate, setNeedUpdate] = useState(false);
  const [id_stud, setIdStudEr]= useState("");
  const [year_peri, setYearPeriEr]= useState("");
  const [term_peri, setTermPeriEr]= useState("");

  const handleDeleteEnrollment = (enroll) => {
    deleteEnrollment([enroll.code,enroll.id_stud]);
  }

  const handleUpdateEnrollment = (enroll) => {
    setUpdatedEnrollment({});
    let inputs = document.getElementsByTagName("input");
    for (let index = 0; index < inputs.length; ++index) {
      inputs[index].value = ""
    }
    console.log("USER TO UPDATE: ", enroll);
    setUpdatedEnrollment(enroll);
  }


  const addEnrollment = () => {
    axios.post("http://localhost:80/admin/create/enrollments", {
      id_stud,
      year_peri,
      term_peri,
    })
      .then((response) => {
        console.log("Success");
        setListaEnrollments([
          ...listaEnrollments,
          {
            id_stud,
            year_peri,
            term_peri,
          },
        ]);
        window.location.reload(false);
      })
      .catch((er) =>{
        alert("You`re trying to add an enrollment whose primary key is already in existance.")
        console.log(er)
      });
  };

const deleteEnrollment = (id) => {
    axios.post(`http://localhost:80/admin/delete/enrollments/${id[0]}:${id[1]}`, { 1: true }, { withCredentials: true })
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

  const updateEnrollment = () => {
    axios.post(`http://localhost:80/admin/update/enrollments/${updatedUser.id}:${updatedUser.id_stud}`, {
     id_stud: id_stud|| updatedUser.id_stud,
      year_peri: year_peri || updatedUser.year_peri,
     term_peri: term_peri || updatedUser.term_peri
    }, { withCredentials: true }).then((response) => {
      window.location.reload(true);
      reload();
    });
  };
useEffect(() => {
  axios
  .get("http://localhost:80/admin/enrollments", { withCredentials: true })
  .then((res) => {
    console.log("DATA FROM ADMIN: ", res.data);
    setIsData(true);
    setEnrollments(res.data)
  });

}, [isData])

const sendInfo = (e) => {
  console.log("Procesando registro");
  e.preventDefault();
  addEnrollment();
};


 return (
 <main className="main-users">
 <form onSubmit={sendInfo}>
          <img  alt="" />
          <div className="form-block">
            <label htmlFor="id_stud">Student's ID</label>
            <input className="row-form"
              type="text"
              id="id_stud"
              value={id_stud || "" || updatedUser.id_stud}
              placeholder="type the ID of the Student"
              onChange={(e)=>setIdStudEr(e.target.value)}
              name="id_stud"
            />
          </div>
          <div className="form-block">
            <label htmlFor="year_peri">Period's Year</label>
            <input className="row-form"
              type="text"
              placeholder="type the year of the Period"
              id="year_peri"
              value={year_peri || "" || updatedUser.year_peri}
              onChange={(e)=>setYearPeriEr(e.target.value)}
              name="year_peri"
            />
          </div>
          <div className="form-block">
            <label htmlFor="year_termEr">Period's Term</label>
            <input className="row-form"
              type="text"
              placeholder="type the term of the Period"
              id="year_termEr"
              value={term_peri || "" || updatedUser.term_peri}
              onChange={(e)=>setTermPeriEr(e.target.value)}
              name="year_termEr"
            />
          </div>
          <input
            type="submit"
            className="button primary-button button-row"
            value="ADD"
          />
          <button
           className="button primary-button button-row"
          onClick={updateEnrollment}
         
          type="button"
        >
        ACTUALIZAR
        </button>
        </form>  
        
    <div className="table">
        <Table
          tableheads={[
              "ID",
            "Student's ID",
            "Period's Year",
            "Period's Term",
            "Actions"
          ]}
          data={isData?enrollments:null}
          setNeedUpdate={setNeedUpdate}
          handleDeleteElement={handleDeleteEnrollment}
          handleUpdateElement={handleUpdateEnrollment}
        />
    </div>
    </main>

 )}

export default Enrollment;
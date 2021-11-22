import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../../components/Table";
import "../../styles/table.css";

const Enrollment= () => {
  const [isData, setIsData] = useState(false);
  const [enrollments, setEnrollments] = useState([]);
  const [updatedUser, setUpdatedUser] = useState({})
  const [listaEnrollments, setListaEnrollments] = useState([]);
  const [needUpdate, setNeedUpdate] = useState(false);
  const [id_stud, setIdStudEr]= useState("");
  const [year_peri, setYearPeriEr]= useState("");
  const [term_peri, setTermPeriEr]= useState("");
  

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
 <main>
 <form action="" className="login-form" onSubmit={sendInfo}>
          <img  alt="" />
          <div className="form-block">
            <label htmlFor="id_stud">Student's ID</label>
            <input
              type="texte"
              id="id_stud"
              value={id_stud || "" || updatedUser.id_stud}
              placeholder="type the ID of the Student"
              onChange={(e)=>setIdStudEr(e.target.value)}
              name="id_stud"
            />
          </div>
          <div className="form-block">
            <label htmlFor="year_peri">Period's Year</label>
            <input
              type="texte"
              placeholder="type the year of the Period"
              id="year_peri"
              value={year_peri || "" || updatedUser.year_peri}
              onChange={(e)=>setYearPeriEr(e.target.value)}
              name="year_peri"
            />
          </div>
          <div className="form-block">
            <label htmlFor="year_termEr">Period's Term</label>
            <input
              type="texte"
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
              "ID",
            "Student's ID",
            "Period's Year",
            "Period's Term",
            "Actions"
          ]}
          data={isData?enrollments:null}
          setNeedUpdate={setNeedUpdate}
          handleDeleteUser={null}
          handleUpdateUser={null}
        />
    </div>
    </main>

 )}

export default Enrollment;
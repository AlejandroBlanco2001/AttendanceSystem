import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../../components/Table";
import "../../styles/table.css";

const PeriodCourse= () => {
  const [isData, setIsData] = useState(false);
  const [periodCourses, setPeriodCourses] = useState([]);
  const [updatedUser, setUpdatedUser] = useState({})
  const [listaPeriodCourses, setListaPeriodCourses] = useState([]);
  const [needUpdate, setNeedUpdate] = useState(false);
  const [code_cour, setCodeCour]= useState();
  const [year_peri, setYearPerio]= useState();
  const [term_peri, setTermPerio]= useState();



  const addPeriodCourse = () => {
    axios.post("http://localhost:80/admin/create/periodCourses", {
      code_cour,
      year_peri,
      term_peri,
    })
      .then((response) => {
        console.log("Success");
        setListaPeriodCourses([
          ...listaPeriodCourses,
          {
            code_cour,
            year_peri,
            term_peri,
          },
        ]);
        window.location.reload(false);
      })
      .catch((er) =>{
        alert("You`re trying to add a Period_Course relation whose primary key is already in existance.")
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
  .get("http://localhost:80/admin/periodCourses", { withCredentials: true })
  .then((res) => {
    console.log("DATA FROM ADMIN: ", res.data);
    setIsData(true);
    setPeriodCourses(res.data)
  });

}, [isData])

const sendInfo = (e) => {
  console.log("Procesando registro");
  e.preventDefault();
  addPeriodCourse();
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
              value={code_cour || null || updatedUser.code_courPc}
              placeholder="type the code of the course"
              onChange={(e)=>setCodeCour(e.target.value)}
              name="code_cour"
            />
          </div>
          <div className="form-block">
            <label htmlFor="year_periPC">Period's Year</label>
            <input
              type="text"
              placeholder="type the year of the period"
              id="year_peri"
              value={year_peri || null || updatedUser.year_peri}
              onChange={(e)=>setYearPerio(e.target.value)}
              name="year_peri"
            />
          </div>
          <div className="form-block">
            <label htmlFor="term_periPC">Period's Term</label>
            <input
              type="text"
              placeholder="type the term of the period"
              id="term_peri"
              value={term_peri || null || updatedUser.term_peri}
              onChange={(e)=>setTermPerio(e.target.value)}
              name="term_peri"
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
            "Period's Year ",
            "Period's Term",
            "Actions"
          ]}
          data={isData?periodCourses:null}
          setNeedUpdate={setNeedUpdate}
          handleDeleteUser={null}
          handleUpdateUser={null}
        />
    </div>
    </main>

 )}

export default PeriodCourse;
import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../../components/Table";
import "../../styles/table.css";

const PeriodCourse= () => {
  const [isData, setIsData] = useState(false);
  const [periodCourses, setPeriodCourses] = useState([]);
  const [updatedUser, setUpdatedPeriodCourse] = useState({});
  const [listaPeriodCourses, setListaPeriodCourses] = useState([]);
  const [needUpdate, setNeedUpdate] = useState(false);
  const [code_cour, setCodeCour]= useState();
  const [year_peri, setYearPerio]= useState();
  const [term_peri, setTermPerio]= useState();

  const handleDeletePeriodCourse= (pdc) => {
    deletePeriodCourse([pdc.code_cour,pdc.year_peri,pdc.term_peri]);
  }

  const handleUpdatePeriodCourse = (pdc) => {
    setUpdatedPeriodCourse({});
    let inputs = document.getElementsByTagName("input");
    for (let index = 0; index < inputs.length; ++index) {
      inputs[index].value = ""
    }
    console.log("USER TO UPDATE: ", pdc);
    setUpdatedPeriodCourse(pdc);
  }

  const addPeriodCourse = () => {
    axios.post("http://localhost:80/admin/create/periodCourses", {
      code_cour,
      year_peri,
      term_peri,
    }, { withCredentials: true })
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


   const deletePeriodCourse = (id) => {
    axios.post(`http://localhost:80/admin/delete/periodCourses/${updatedUser.code_cour}|${updatedUser.year_peri}|${updatedUser.term_peri}`, { 1: true }, { withCredentials: true })
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

  const updatePeriodCourse = () => {
    axios.post(`http://localhost:80/admin/update/periodCourses/${updatedUser.code_cour}|${updatedUser.year_peri}|${updatedUser.term_peri}`, {
      code_cour: code_cour|| updatedUser.code_cour,
      year_peri: year_peri || updatedUser.year_peri,
      term_peri: term_peri || updatedUser.term_peri,
    }, { withCredentials: true }).then((response) => {
      window.location.reload(true);
      reload();
    });
  };

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
 <main className="main-users">
 <form  onSubmit={sendInfo}>
          <img  alt="" />
          <div className="form-block">
            <label htmlFor="code_cour">Course's Code</label>
            <input className="row-form"
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
            <input className="row-form"
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
            <input className="row-form"
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
          onClick={updatePeriodCourse}
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
          handleDeleteElement={handleDeletePeriodCourse}
          handleUpdateElement={handleUpdatePeriodCourse}
        />
    </div>
    </main>

 )}

export default PeriodCourse;
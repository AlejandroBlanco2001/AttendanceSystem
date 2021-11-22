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
  const [code_cour, setCodeCour]= useState("");
  const [year_periPc, setYearPerio]= useState("");
  const [term_periPc, setTermPerio]= useState("");



//   const addUser = () => {
//     axios.post("http://localhost:80/admin/create/users", {
//       username,
//       passcode,
//       id_person,
//     })
//       .then((response) => {
//         console.log("Success");
//         setListaUsers([
//           ...listaUsers,
//           {
//             username,
//             passcode,
//             id_person,
//           },
//         ]);
//         window.location.reload(false);
//       })
//       .catch((er) =>{
//         alert("Disculpe esta ingresando un usuario ya existente")
//         console.log(er)
//       });
//   };


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
//   addUser();
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
              value={code_cour || "" || updatedUser.code_courPc}
              placeholder="type the code of the course"
              onChange={(e)=>setCodeCour(e.target.value)}
              name="code_cour"
            />0
          </div>
          <div className="form-block">
            <label htmlFor="year_periPC">Period's Year</label>
            <input
              type="text"
              placeholder="type the year of the period"
              id="year_periPc"
              value={year_periPc || "" || updatedUser.year_periPc}
              onChange={(e)=>setYearPerio(e.target.value)}
              name="year_periPc"
            />
          </div>
          <div className="form-block">
            <label htmlFor="term_periPC">Period's Term</label>
            <input
              type="text"
              placeholder="type the term of the period"
              id="term_periPc"
              value={term_periPc || "" || updatedUser.term_periPc}
              onChange={(e)=>setTermPerio(e.target.value)}
              name="term_periPc"
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
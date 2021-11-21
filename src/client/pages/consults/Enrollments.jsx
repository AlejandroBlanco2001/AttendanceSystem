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
  const [id_studEr, setIdStudEr]= useState("");
  const [year_periEr, setYearPeriEr]= useState("");
  const [term_periEr, setTermPeriEr]= useState("");
  

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
//   addUser();
};


 return (
 <main>
 <form action="" className="login-form" onSubmit={sendInfo}>
          <img  alt="" />
          <div className="form-block">
            <label htmlFor="id_studEr">Id Student</label>
            <input
              type="text"
              id="id_studEr"
              value={id_studEr || "" || updatedUser.id_studEr}
              placeholder="type the ID of the Student"
              onChange={(e)=>setIdStudEr(e.target.value)}
              name="id_studEr"
            />
          </div>
          <div className="form-block">
            <label htmlFor="year_periEr">Year Period</label>
            <input
              type="text"
              placeholder="type the year of the Period"
              id="year_periEr"
              value={year_periEr || "" || updatedUser.year_periEr}
              onChange={(e)=>setYearPeriEr(e.target.value)}
              name="year_periEr"
            />
          </div>
          <div className="form-block">
            <label htmlFor="term_periEr">End of Period</label>
            <input
              type="text"
              placeholder="type the year of the Period"
              id="term_periEr"
              value={term_periEr || "" || updatedUser.term_periEr}
              onChange={(e)=>setTermPeriEr(e.target.value)}
              name="term_periEr"
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
            "ID Student Enrollment",
            "Year Period Enrollment",
            "End Period Enrollment",
            "Accions"
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
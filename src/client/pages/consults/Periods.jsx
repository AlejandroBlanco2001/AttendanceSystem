import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../../components/Table";
import "../../styles/table.css";

const Periods= () => {
  const [isData, setIsData] = useState(false);
  const [periods, setPeriods] = useState([]);
  const [updatedUser, setUpdatedUser] = useState({})
  const [listaPeriods, setListaPeriods] = useState([]);
  const [needUpdate, setNeedUpdate] = useState(false);
  const [year, setYear]= useState("");
  const [term, setTerm]= useState("");
  const [descriptionPd, setDescription]= useState("");


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
  .get("http://localhost:80/admin/periods", { withCredentials: true })
  .then((res) => {
    console.log("DATA FROM ADMIN: ", res.data);
    setIsData(true);
    setPeriods(res.data)
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
            <label htmlFor="year">Year</label>
            <input
              type="text"
              id="year"
              value={year || "" || updatedUser.year}
              placeholder="type the year"
              onChange={(e)=>setYear(e.target.value)}
              name="year"
            />
          </div>
          <div className="form-block">
            <label htmlFor="term">Term</label>
            <input
              type="text"
              placeholder="type the Term"
              id="term"
              value={term|| "" || updatedUser.term}
              onChange={(e)=>setTerm(e.target.value)}
              name="term"
            />
          </div>
          <div className="form-block">
            <label htmlFor="descriptionPd">Period's Description</label>
            <input
              type="text"
              placeholder="type the descriptionof the period"
              id="descriptionPd"
              value={descriptionPd || "" || updatedUser.descriptionPd}
              onChange={(e)=>setDescription(e.target.value)}
              name="descriptionPd"
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
            "Year",
            "Term",
            "Description",
            "Actions"
          ]}
          data={isData?periods:null}
          setNeedUpdate={setNeedUpdate}
          handleDeleteUser={null}
          handleUpdateUser={null}
        />
    </div>
    </main>

 )}

export default Periods;
import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../../components/Table";
import "../../styles/table.css";

const Contract= () => {
  const [isData, setIsData] = useState(false);
  const [contracts, setContracts] = useState([]);
  const [updatedUser, setUpdatedUser] = useState({})
  const [listContracts, setListContracts] = useState([]);
  const [needUpdate, setNeedUpdate] = useState(false);
  const [id_studCtr, setIDStudCtr]= useState(0);
  const [code_syllCtr, setCodeSyllCtr]= useState("");
  const [year_periCtr, setYearPeriCtr]= useState("");
  const [term_periCtr, setTermPeriCtr]= useState("");


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
  .get("http://localhost:80/admin/contracts", { withCredentials: true })
  .then((res) => {
    console.log("DATA FROM ADMIN: ", res.data);
    setIsData(true);
    setContracts(res.data)
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
            <label htmlFor="id_studCtr">Id Student Contract</label>
            <input
              type="text"
              id="id_studCtr"
              value={id_studCtr || "" || updatedUser.id_studCtr}
              placeholder="type the ID of the student contract"
              onChange={(e)=>setIDStudCtr(e.target.value)}
              name="id_studCr"
            />
          </div>
          <div className="form-block">
            <label htmlFor="code_syllCtr">Code Syllabus Contract</label>
            <input
              type="text"
              placeholder="type the syllabus code"
              id="code_syllCtr"
              value={code_syllCtr || "" || updatedUser.code_syllCtr}
              onChange={(e)=>setCodeSyllCtr(e.target.value)}
              name="code_syllCtr"
            />
          </div>
          <div className="form-block">
            <label htmlFor="year_periCtr">Year Period</label>
            <input
              type="text"
              placeholder="type the year period"
              id="year_periCtr"
              value={year_periCtr || "" || updatedUser.year_periCtr}
              onChange={(e)=>setYearPeriCtr(e.target.value)}
              name="year_periCtr"
            />
          </div>
          <div className="form-block">
            <label htmlFor="term_periCtr"> Term Period</label>
            <input
              type="text"
              placeholder="type the Term Period"
              id="term_periCtr"
              value={term_periCtr || "" || updatedUser.term_periCtr}
              onChange={(e)=>setTermPeriCtr(e.target.value)}
              name="term_periCtr"
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
            "ID student contract",
            "Completed",
            "Code syllabus contract",
            "Year period contract",
            "Term period contract",
            "Accions"
          ]}
          data={isData?contracts:null}
          setNeedUpdate={setNeedUpdate}
          handleDeleteUser={null}
          handleUpdateUser={null}
        />
    </div>
    </main>

 )}

export default Contract;
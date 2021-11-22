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
  const [id_stud, setIDStudCtr]= useState();
  const [code_syll, setCodeSyllCtr]= useState();
  const [year_peri, setYearPeriCtr]= useState();
  const [term_peri, setTermPeriCtr]= useState();


  const addContract = () => {
    axios.post("http://localhost:80/admin/create/contracts", {
      id_stud,
      code_syll,
      year_peri,
      term_peri
    })
      .then((response) => {
        console.log("Success");
        setListaUsers([
          ...listaUsers,
          {
            id_stud,
            code_syll,
            year_peri,
            term_peri
          },
        ]);
        window.location.reload(false);
      })
      .catch((er) =>{
        alert("You`re trying to add a contract whose primary key is already in existance.")
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
  addContract();
};


 return (
 <main>
 <form action="" className="login-form" onSubmit={sendInfo}>
          <img  alt="" />
          <div className="form-block">
            <label htmlFor="id_stud">Hiring Student's ID</label>
            <input
              type="texte"
              id="id_stud"
              value={id_stud || "" || updatedUser.id_stud}
              placeholder="type the ID of the hiring student"
              onChange={(e)=>setIDStudCtr(e.target.value)}
              name="id_studCr"
            />
          </div>
          <div className="form-block">
            <label htmlFor="code_syll">Syllabus' Code</label>
            <input
              type="texte"
              placeholder="type the syllabus' code"
              id="code_syll"
              value={code_syll || "" || updatedUser.code_syll}
              onChange={(e)=>setCodeSyllCtr(e.target.value)}
              name="code_syll"
            />
          </div>
          <div className="form-block">
            <label htmlFor="year_peri">Period's Year</label>
            <input
              type="texte"
              placeholder="type the period's year"
              id="year_peri"
              value={year_peri || "" || updatedUser.year_peri}
              onChange={(e)=>setYearPeriCtr(e.target.value)}
              name="year_peri"
            />
          </div>
          <div className="form-block">
            <label htmlFor="term_peri">Period's Term</label>
            <input
              type="texte"
              placeholder="type the period's term"
              id="term_peri"
              value={term_peri || "" || updatedUser.term_peri}
              onChange={(e)=>setTermPeriCtr(e.target.value)}
              name="term_peri"
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
            "Hiring Student'S ID",
            "Completed",
            "Syllabus' Code",
            "Period's Year",
            "Period's Term",
            "Actions"
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
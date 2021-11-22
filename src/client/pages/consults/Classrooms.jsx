import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../../components/Table";
import "../../styles/table.css";

const Classroom= () => {
  const [isData, setIsData] = useState(false);
  const [classrooms, setClassrooms] = useState([]);
  const [updatedUser, setUpdatedUser] = useState({})
  const [listaClassrooms, setListaClassrooms] = useState([]);
  const [needUpdate, setNeedUpdate] = useState(false);
  const [code, setCodeClr]= useState("");
  const [type, setTypeClr]= useState("");


  const addClassroom = () => {
    axios.post("http://localhost:80/admin/create/classrooms", {
      code,
      type,
    })
      .then((response) => {
        console.log("Success");
        setListaClassrooms([
          ...listaClassrooms,
          {
            code,
            type,
          },
        ]);
        window.location.reload(false);
      })
      .catch((er) =>{
        alert("You`re trying to add a classroom whose primary key is already in existance.")
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
  .get("http://localhost:80/admin/classrooms", { withCredentials: true })
  .then((res) => {
    console.log("DATA FROM ADMIN: ", res.data);
    setIsData(true);
    setClassrooms(res.data)
  });

}, [isData])

const sendInfo = (e) => {
  console.log("Procesando registro");
  e.preventDefault();
  addClassroom();
};


 return (
 <main>
 <form action="" className="login-form" onSubmit={sendInfo}>
          <img  alt="" />
          <div className="form-block">
            <label htmlFor="code">Classroom's Code</label>
            <input
              type="texte"
              id="code"
              value={code || "" || updatedUser.code}
              placeholder="type the code of the Classroom"
              onChange={(e)=>setCodeClr(e.target.value)}
              name="code"
            />
          </div>
          <div className="form-block">
            <label htmlFor="type">Classroom Type</label>
            <select
              type="texte"
              placeholder="type the type classroom"
              id="type"
              value={type || "" || updatedUser.type}
              onChange={(e)=>setTypeClr(e.target.value)}
              name="type"
            >
              <option value="Physical">Physical</option>
              <option value="Virtual">Virtual</option>
            </select>
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
            "Classroom's Code",
            "Classroom Type",
            "Actions"
          ]}
          data={isData?classrooms:null}
          setNeedUpdate={setNeedUpdate}
          handleDeleteUser={null}
          handleUpdateUser={null}
        />
    </div>
    </main>

 )}

export default Classroom;
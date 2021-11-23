import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../../components/Table";
import "../../styles/table.css";

const Class= () => {
  const [isData, setIsData] = useState(false);
  const [classes, setClasses] = useState([]);
  const [updatedUser, setUpdatedUser] = useState({})
  const [listaClasses, setListaClasses] = useState([]);
  const [needUpdate, setNeedUpdate] = useState(false);
  const [code, setCodeCl]= useState(0);
  const [start_time, setStartTimeCl]= useState();
  const [code_spac, setCodeSpac]= useState("");

  const addClass = () => {
    axios.post("http://localhost:80/admin/create/classes", {
     code,
     start_time,
     code_spac,
    })
      .then((response) => {
        console.log("Success");
        setListaClasses([
          ...listaClasses,
          {
            code,
            start_time,
            code_spac,
          },
        ]);
        window.location.reload(false);
      })
      .catch((er) =>{
        alert("You`re trying to add a class whose primary key is already in existance.")
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
  .get("http://localhost:80/admin/classes", { withCredentials: true })
  .then((res) => {
    console.log("DATA FROM ADMIN: ", res.data);
    setIsData(true);
    setClasses(res.data)
  });

}, [isData])

const sendInfo = (e) => {
  console.log("Procesando registro");
  e.preventDefault();
  addClass();
};


 return (
 <main>
 <form action="" className="login-form" onSubmit={sendInfo}>
          <img  alt="" />
          <div className="form-block">
            <label htmlFor="code">Class' Code</label>
            <input
              type="text"
              id="code"
              value={code || "" || updatedUser.code}
              placeholder="type the code of the class"
              onChange={(e)=>setCodeCl(e.target.value)}
              name="code"
            />
          </div>
          <div className="form-block">
            <label htmlFor="start_time">Start Time</label>
            <input
              type="text"
              placeholder="type the start time of the class"
              id="start_time"
              value={start_time || "" || updatedUser.start_time}
              onChange={(e)=>setStartTimeCl(e.target.value)}
              name="start_time"
            />
          </div>
          <div className="form-block">
            <label htmlFor="code_spac">Space's Code</label>
            <input
              type="text"
              placeholder="type the code of the Space"
              id="code_spac"
              value={code_spac || "" || updatedUser.code_spac}
              onChange={(e)=>setCodeSpac(e.target.value)}
              name="code_spac"
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
            "Class Code",
            "Start Time",
            "Space's Code",
            "Actions"
          ]}
          data={isData?classes:null}
          setNeedUpdate={setNeedUpdate}
          handleDeleteUser={null}
          handleUpdateUser={null}
        />
    </div>
    </main>

 )}

export default Class;
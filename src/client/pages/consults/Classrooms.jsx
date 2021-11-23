import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../../components/Table";
import "../../styles/table.css";

const Classroom= () => {
  const [isData, setIsData] = useState(false);
  const [classrooms, setClassrooms] = useState([]);
  const [updatedUser, setUpdatedClassroom] = useState({})
  const [listaClassrooms, setListaClassrooms] = useState([]);
  const [needUpdate, setNeedUpdate] = useState(false);
  const [code, setCodeClr]= useState("");
  const [type, setTypeClr]= useState("");

  const handleDeleteClassroom = (classroom) => {
    deleteClassroom(classroom.code);
  }

  const handleUpdateClassroom = (classroom) => {
    setUpdatedClassroom({});
    let inputs = document.getElementsByTagName("input");
    for (let index = 0; index < inputs.length; ++index) {
      inputs[index].value = ""
    }
    console.log("USER TO UPDATE: ", classroom);
    setUpdatedClassroom(classroom);
  }

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

  const deleteClassroom = (id) => {
    axios.post(`http://localhost:80/admin/delete/classrooms/${id}`, { 1: true }, { withCredentials: true })
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

  const updateClassroom = () => {
    axios.post(`http://localhost:80/admin/update/classrooms/${updatedUser.code}`, {
      code: code|| updatedUser.code,
      type: type || updatedUser.type,
    }, { withCredentials: true }).then((response) => {
      window.location.reload(true);
      reload();
    });
  };

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
 <main className="main-users">
 <form onSubmit={sendInfo}>
          <img  alt="" />
          <div className="form-block">
            <label htmlFor="code">Classroom's Code</label>
            <input className="row-form"
              type="text"
              id="code"
              value={code || "" || updatedUser.code}
              placeholder="type the code of the Classroom"
              onChange={(e)=>setCodeClr(e.target.value)}
              name="code"
            />
          </div>
          <div className="form-block">
            <label htmlFor="type">Classroom Type</label>
            <select className="row-form"
              type="text"
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
          onClick={updateClassroom}
          type="button"
        >
        UPDATE
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
          handleDeleteElement={handleDeleteClassroom}
          handleUpdateElement={handleUpdateClassroom}
        />
    </div>
    </main>

 )}

export default Classroom;
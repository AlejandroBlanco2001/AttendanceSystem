import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../../components/Table";
import "../../styles/table.css";

const Deparment= () => {
  const [isData, setIsData] = useState(false);
  const [deparments, setDeparment] = useState([]);
  const [updatedUser, setUpdatedDeparment] = useState({})
  const [listaDeparments, setListaDeparments] = useState([]);
  const [needUpdate, setNeedUpdate] = useState(false);
  const [id, setID]= useState();
  const [name, setName]= useState();


  const handleDeleteDeparment = (dept) => {
    deleteDeparment(dept.id);
  }

  const handleUpdateDeparment = (dept) => {
    setUpdatedDeparment({});
    let inputs = document.getElementsByTagName("input");
    for (let index = 0; index < inputs.length; ++index) {
      inputs[index].value = ""
    }
    console.log("USER TO UPDATE: ", dept);
    setUpdatedDeparment(dept);
  }

  const updateDeparment= () => {
    axios.post(`http://localhost:80/admin/update/departments/${updatedUser.id}`, {
      id: id|| updatedUser.id,
      name: name || updatedUser.name
    }, { withCredentials: true }).then((response) => {
      window.location.reload(true);
      reload();
    });
  };

  const deleteDeparment = (id) => {
    axios.post(`http://localhost:80/admin/delete/departments/${id}`, { 1: true }, { withCredentials: true })
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

  const addDeparment = () => {
    axios.post("http://localhost:80/admin/create/departments", {
      name,
    })
      .then((response) => {
        console.log("Success");
        setListaDeparments([
          ...listaDeparments,
          {
            name,
          },
        ]);
        window.location.reload(false);
      })
      .catch((er) =>{
        alert("You`re trying to add a department whose primary key is already in existance.")
        console.log(er)
      });
  };


useEffect(() => {
  axios
  .get("http://localhost:80/admin/departments", { withCredentials: true })
  .then((res) => {
    console.log("DATA FROM ADMIN: ", res.data);
    setIsData(true);
    setDeparment(res.data)
  });

}, [isData])

const sendInfo = (e) => {
  console.log("Procesando registro");
  e.preventDefault();
  addDeparment();
};


 return (
 <main  className="main-users">
 <form onSubmit={sendInfo}>
          <img  alt="" />
          <div className="form-block">
            <label htmlFor="id">Department's ID</label>
            <input className="row-form"
              type="text"
              id="id"
              value={id || "" || updatedUser.id}
              onChange={(e)=>setID(e.target.value)}
              name="id"
              disabled={true}
            />
          </div>
          <div className="form-block">
            <label htmlFor="name">Department's Name</label>
            <input className="row-form"
              type="text"
              placeholder="type the name of the subject"
              id="name"
              value={name || "" || updatedUser.name}
              onChange={(e)=>setName(e.target.value)}
              name="name"
            />
          </div>
          <input 
            type="submit"
            className="button primary-button button-row"
            value="ADD"
          />
          <button
           className="button secondary-button button-row"
          onClick={updateDeparment}
          type="button"
        >
        UPDATE
        </button>
        </form>  
        
    <div className="table">
        <Table
          tableheads={[
            "Deparment's Code",
            "Deparment's Name",
            "Actions"
          ]}
          data={isData?deparments:null}
          setNeedUpdate={setNeedUpdate}
          handleDeleteElement={handleDeleteDeparment}
          handleUpdateElement={handleUpdateDeparment}
        />
    </div>
    </main>

 )}

export default Deparment;
import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../../components/Table";
import "../../styles/table.css";

const Program= () => {
  const [isData, setIsData] = useState(false);
  const [programs, setPrograms] = useState([]);
  const [updatedUser, setUpdatedPrograms] = useState({})
  const [listaPrograms, setListaPrograms] = useState([]);
  const [needUpdate, setNeedUpdate] = useState(false);
  const [snies, setSNIES]= useState();
  const [name, setNameProg]= useState();
  const [type, setTypeProg]= useState();
  const [title, setTitle]= useState();
  const [duration, setDuration]= useState();
  const [credits, setCreditsProg]= useState();
  const [id_dept, setIdDeptProg]= useState();


  const handleDeletePrograms = (programs) => {
    deletePrograms(programs.snies);
  }

  const handleUpdatePrograms = (programs) => {
    setUpdatedPrograms({});
    let inputs = document.getElementsByTagName("input");
    for (let index = 0; index < inputs.length; ++index) {
      inputs[index].value = ""
    }
    console.log("USER TO UPDATE: ", programs);
    setUpdatedPrograms(programs);
  }





  const addProgram = () => {
    axios.post("http://localhost:80/admin/create/programs", {
      snies,
      name,
      type,
      title,
      duration,
      credits,
      id_dept
    }, { withCredentials: true })
      .then((response) => {
        console.log("Success");
        setListaPrograms([
          ...listaPrograms,
          {
            snies,
            name,
            type,
            title,
            duration,
            credits,
            id_dept
          },
        ]);
        window.location.reload(false);
      })
      .catch((er) =>{
        alert("You`re trying to add a program whose primary key is already in existance.")
        console.log(er)
      });
  };


  const deletePrograms = (id) => {
    axios.post(`http://localhost:80/admin/delete/programs/${id}`, { 1: true }, { withCredentials: true })
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

  const updatePrograms = () => {
    axios.post(`http://localhost:80/admin/update/programs/${updatedUser.snies}`, {
      snies: snies|| updatedUser.snies,
      name: name || updatedUser.name,
      type: type || updatedUser.type,
      title: title || updatedUser.title,
      duration: duration || updatedUser.duration,
      credits: credits || updatedUser.credits,
      id_dept: id_dept || updatedUser.id_dept,

    }, { withCredentials: true }).then((response) => {
      window.location.reload(true);
      reload();
    });
  };


useEffect(() => {
  axios
  .get("http://localhost:80/admin/programs", { withCredentials: true })
  .then((res) => {
    console.log("DATA FROM ADMIN: ", res.data);
    setIsData(true);
    setPrograms(res.data)
  });

}, [isData])

const sendInfo = (e) => {
  console.log("Procesando registro");
  e.preventDefault();
  addProgram();
};


 return (
 <main className="main-users">
 <form onSubmit={sendInfo}>
          <img  alt="" />
          <div className="form-block">
            <label htmlFor="snies">SNIES</label>
            <input className="row-form"
              type="text"
              id="snies"
              value={snies || "" || updatedUser.snies}
              placeholder="type the SNIES"
              onChange={(e)=>setSNIES(e.target.value)}
              name="snies"
            />
          </div>
          <div className="form-block">
            <label htmlFor="name">Program's Name</label>
            <input className="row-form"
              type="text"
              placeholder="type the name of the program"
              id="name"
              value={name || "" || updatedUser.name}
              onChange={(e)=>setNameProg(e.target.value)}
              name="name"
            />
          </div>
          <div className="form-block">
            <label htmlFor="type">Program type</label>
            <select
              type="text"
              placeholder="type the type of program"
              id="type"
              value={type || "" || updatedUser.type}
              onChange={(e)=>setTypeProg(e.target.value)}
              name="type"
            >
              <option value="0">0</option>
              <option value="1">1</option>

            </select>
          </div>
          <div className="form-block">
            <label htmlFor="title">Title</label>
            <input className="row-form"
              type="text"
              placeholder="type the title of the program"
              id="title"
              value={title || "" || updatedUser.title}
              onChange={(e)=>setTitle(e.target.value)}
              name="title"
            />
          </div>
          <div className="form-block">
            <label htmlFor="duration">Duration</label>
            <input className="row-form"
              type="text"
              placeholder="type the duration of the program"
              id="duration"
              value={duration || "" || updatedUser.duration}
              onChange={(e)=>setDuration(e.target.value)}
              name="duration"
            />
            
          </div>
          <div className="form-block">
            <label htmlFor="credits">Credits</label>
            <input className="row-form"
              type="number"
              placeholder="type the credits"
              id="credits"
              value={credits || "" || updatedUser.credits}
              onChange={(e)=>setCreditsProg(e.target.value)}
              name="credits"
            />
            
          </div>
          <div className="form-block">
          <label htmlFor="id_dpt">ID departament</label>
        <select
          type="text"
          id="id_dpt"
          value={id_dept || null || updatedUser.id_dept}
          onChange={(e) => setIdDeptProg(e.target.value)}
          name="id_dpt"
          placeholder="Type the id of the department "
          disabled={needUpdate}
        >
                <option value="1">Architecture and Urbanism</option>
                <option value="2">Design</option> 
                <option value="3">Physics and Geosciences</option> 
                <option value="4">Mathematics and Stastics</option> 
                <option value="5">Chemistry and Biology</option> 
                <option value="6">Computer and Systems Engineering</option> 
                <option value="7">Spanish</option> 
                <option value="8">Social Comunication</option> 


          </select>
          </div>
          <input
            type="submit"
            className="button primary-button button-row"
            value="ADD"
          />
          <button
           className="button secondary-button button-row"
           onClick={updatePrograms}
          type="button"
        >
        UPDATE
        </button>
        </form>  
        
    <div className="table">
        <Table
          tableheads={[
            "SNIES",
            "Program's Name",
            "Program Type",
            "Title",
            "Duration",
            "Credits",
            "Deparment's Name",
            "Actions"
          ]}
          data={isData?programs:null}
          setNeedUpdate={setNeedUpdate}
          handleDeleteElement={handleDeletePrograms}
          handleUpdateElement={handleUpdatePrograms}
        />
    </div>
    </main>

 )}

export default Program;
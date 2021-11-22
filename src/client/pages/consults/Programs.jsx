import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../../components/Table";
import "../../styles/table.css";

const Program= () => {
  const [isData, setIsData] = useState(false);
  const [programs, setPrograms] = useState([]);
  const [updatedUser, setUpdatedUser] = useState({})
  const [listaPrograms, setListaPrograms] = useState([]);
  const [needUpdate, setNeedUpdate] = useState(false);
  const [snies, setSNIES]= useState();
  const [name, setNameProg]= useState();
  const [type, setTypeProg]= useState();
  const [title, setTitle]= useState();
  const [duration, setDuration]= useState();
  const [credits, setCreditsProg]= useState();
  const [id_dept, setIdDeptProg]= useState();








  const addProgram = () => {
    axios.post("http://localhost:80/admin/create/programs", {
      snies,
      name,
      type,
      title,
      duration,
      credits,
      id_dept
    })
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
        alert("Disculpe esta ingresando un usuario ya existente")
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
 <main>
 <form action="" className="login-form" onSubmit={sendInfo}>
          <img  alt="" />
          <div className="form-block">
            <label htmlFor="snies">SNIES</label>
            <input
              type="texte"
              id="snies"
              value={snies || "" || updatedUser.snies}
              placeholder="type the SNIES"
              onChange={(e)=>setSNIES(e.target.value)}
              name="snies"
            />
          </div>
          <div className="form-block">
            <label htmlFor="name">Program's Name</label>
            <input
              type="texte"
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
              type="texte"
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
            <input
              type="texte"
              placeholder="type the title of the program"
              id="title"
              value={title || "" || updatedUser.title}
              onChange={(e)=>setTitle(e.target.value)}
              name="title"
            />
          </div>
          <div className="form-block">
            <label htmlFor="duration">Duration</label>
            <input
              type="texte"
              placeholder="type the duration of the program"
              id="duration"
              value={duration || "" || updatedUser.duration}
              onChange={(e)=>setDuration(e.target.value)}
              name="duration"
            />
            
          </div>
          <div className="form-block">
            <label htmlFor="credits">Credits</label>
            <input
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
          type="texte"
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
          handleDeleteUser={null}
          handleUpdateUser={null}
        />
    </div>
    </main>

 )}

export default Program;
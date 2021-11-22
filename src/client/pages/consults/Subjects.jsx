import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../../components/Table";
import "../../styles/table.css";

const Subjects= () => {
  const [isData, setIsData] = useState(false);
  const [subjects, setSubject] = useState([]);
  const [updatedUser, setUpdatedUser] = useState({})
  const [listaSubjects, setListaSubjects] = useState([]);
  const [needUpdate, setNeedUpdate] = useState(false);
  const [code, setCode]= useState("");
  const [name, setName]= useState("");
  const [credits, setCredits]= useState(0);
  const [description, setDescription]= useState("");
  const [type, setType]= useState("");
  const [urlimage, setUrlImage]= useState("");
  const [id_dept, setID]= useState();


  const addSubject = () => {
    axios.post("http://localhost:80/admin/create/subjects", {
      code,
      name,
      credits,
      description,
      type,
      urlimage,
      id_dept,
    })
      .then((response) => {
        console.log("Success");
        setListaSubjects([
          ...listaSubjects,
          {
            code,
            name,
            credits,
            description,
            type,
            urlimage,
            id_dept,
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
  .get("http://localhost:80/admin/subjects", { withCredentials: true })
  .then((res) => {
    console.log("DATA FROM ADMIN: ", res.data);
    setIsData(true);
    setSubject(res.data)
  }).catch((e)=>{
    throw e
  });

}, [isData])

const sendInfo = (e) => {
  console.log("Procesando registro");
  e.preventDefault();
  addSubject();
};


 return (
 <main>
 <form action="" className="login-form" onSubmit={sendInfo}>
          <img  alt="" />
          <div className="form-block">
            <label htmlFor="code">Subject's Code</label>
            <input
              type="texte"
              id="code"
              value={code || "" || updatedUser.code}
              placeholder="type the code of the Subject"
              onChange={(e)=>setCode(e.target.value)}
              name="code"
            />
          </div>
          <div className="form-block">
            <label htmlFor="name">Subject's Name</label>
            <input
              type="texte"
              placeholder="type the name of the subject"
              id="name"
              value={name || "" || updatedUser.name}
              onChange={(e)=>setName(e.target.value)}
              name="name"
            />
          </div>
          <div className="form-block">
            <label htmlFor="credits">No. of Credits</label>
            <input
              type="number"
              placeholder="type the number of credits"
              id="credits"
              value={credits || "" || parseInt(updatedUser.credits)}
              onChange={(e)=>setCredits(e.target.value)}
              name="credits"
            />
          </div>
          <div className="form-block">
            <label htmlFor="description">Description</label>
            <input
              type="texte"
              id="description"
              value={description || "" || updatedUser.description}
              placeholder="type the description of the subject"
              onChange={(e)=>setDescription(e.target.value)}
              name="description"
              />
          </div>
          <div className="form-block">
            <label htmlFor="type">Subject Type</label>
            <select
              type="texte"
              placeholder="type the type of the subject"
              id="type"
              value={type || "" || updatedUser.type}
              onChange={(e)=>setType(e.target.value)}
              name="type"
            >
              <option value="Theory">Theory</option>
              <option value="Theory and Laboratory">Theory and Laboratory</option>
            </select>
          </div>
          <div className="form-block">
            <label htmlFor="urlimage">URL Image</label>
            <input
              type="texte"
              id="urlimage"
              value={urlimage || "" || updatedUser.urlimage}
              placeholder="type the url of the deparmentt"
              onChange={(e)=>setUrlImage(e.target.value)}
              name="urlimage"
              />
          </div>
          <div className="form-block">
          <label htmlFor="id_dpt">ID departament</label>
        <select
          type="texte"
          id="id_dpt"
          value={id_dept || null || updatedUser.id_dept}
          onChange={(e) => setID(e.target.value)}
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
            "Subject's Code",
            "Subject's Name",
            "Credits",
            "Description",
            "Subject Type",
            "URL Image",
            "ID Deparment",
            "Actions"
          ]}
          data={isData?subjects:null}
          setNeedUpdate={setNeedUpdate}
          handleDeleteUser={null}
          handleUpdateUser={null}
        />
    </div>
    </main>

 )}

export default Subjects;
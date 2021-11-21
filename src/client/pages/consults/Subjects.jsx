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
  const [id_dept, setID]= useState(0);


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
  .get("http://localhost:80/admin/subjects", { withCredentials: true })
  .then((res) => {
    console.log("DATA FROM ADMIN: ", res.data);
    setIsData(true);
    setSubject(res.data)
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
            <label htmlFor="code">Code Subject</label>
            <input
              type="text"
              id="code"
              value={code || "" || updatedUser.code}
              placeholder="type the code of the Subject"
              onChange={(e)=>setCode(e.target.value)}
              name="code"
            />
          </div>
          <div className="form-block">
            <label htmlFor="name">Name subject</label>
            <input
              type="text"
              placeholder="type the name of the subject"
              id="name"
              value={name || "" || updatedUser.name}
              onChange={(e)=>setName(e.target.value)}
              name="name"
            />
          </div>
          <div className="form-block">
            <label htmlFor="credits"># Credits</label>
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
              type="text"
              id="description"
              value={description || "" || updatedUser.description}
              placeholder="type the description of the subject"
              onChange={(e)=>setDescription(e.target.value)}
              name="description"
              />
          </div>
          <div className="form-block">
            <label htmlFor="type">Type</label>
            <input
              type="text"
              placeholder="type the type of the subject"
              id="type"
              value={type || "" || updatedUser.type}
              onChange={(e)=>setType(e.target.value)}
              name="type"
            />
          </div>
          <div className="form-block">
            <label htmlFor="urlimage">URL Image</label>
            <input
              type="text"
              id="urlimage"
              value={urlimage || "" || updatedUser.urlimage}
              placeholder="type the url of the deparmentt"
              onChange={(e)=>setUrlImage(e.target.value)}
              name="urlimage"
              />
          </div>
          <div className="form-block">
            <label htmlFor="id_dept">ID Department</label>
            <input
              type="text"
              id="id_dept"
              value={id_dept || "" || updatedUser.id_dept}
              placeholder="type the ID of the deparment"
              onChange={(e)=>setID(e.target.value)}
              name="id_dept"
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
            "Code Subject",
            "Name Subject",
            "Credits",
            "Description",
            "Type Subject",
            "URL Image",
            "ID Deparment",
            "Accions"
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
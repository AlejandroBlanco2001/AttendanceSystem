import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../../components/Table";
import "../../styles/table.css";

const Syllabus= () => {
  const [isData, setIsData] = useState(false);
  const [syllabuses, setSyllabuses] = useState([]);
  const [updatedUser, setUpdatedUser] = useState({})
  const [listaSyllabuses, setListaSyllabuses] = useState([]);
  const [needUpdate, setNeedUpdate] = useState(false);
  const [codeSy, setCodeSy]= useState("");
  const [snies_prog, setSniesProg]= useState("");


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
  .get("http://localhost:80/admin/syllabuses", { withCredentials: true })
  .then((res) => {
    console.log("DATA FROM ADMIN: ", res.data);
    setIsData(true);
    setSyllabuses(res.data)
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
            <label htmlFor="codeSy">Code Syllabus</label>
            <input
              type="text"
              id="codeSy"
              value={codeSy || "" || updatedUser.codeSy}
              placeholder="type the code of the Syllabus"
              onChange={(e)=>setCodeSy(e.target.value)}
              name="codeSy"
            />
          </div>
          <div className="form-block">
            <label htmlFor="snies_prog">Program</label>
            <input
              type="text"
              placeholder="type the program"
              id="snies_prog"
              value={snies_prog || "" || updatedUser.snies_prog}
              onChange={(e)=>setSniesProg(e.target.value)}
              name="snies_prog"
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
            "Code Syllabus",
            "SNIES Program",
            "Accions"
          ]}
          data={isData?syllabuses:null}
          setNeedUpdate={setNeedUpdate}
          handleDeleteUser={null}
          handleUpdateUser={null}
        />
    </div>
    </main>

 )}

export default Syllabus;
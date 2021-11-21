import React, { useState, useEffect } from "react";
//import background from "../images/background1.svg";
import axios from "axios";
import Table from "../../components/Table";
import "../../styles/table.css";

const Users= () => {
  const [isData, setIsData] = useState(false);
  const [users, setUsers] = useState([]);
  const [updatedUser, setUpdatedUser] = useState({})
  const [listaUsers, setListaUsers] = useState([]);
  const [needUpdate, setNeedUpdate] = useState(false);

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };


  // const addUser = () => {
  //   Axios.post("http://localhost:3004/crearpadre", {
  //     username,
  //     passcode,
  //     urlimage,
  //     id_person,
  //   })
  //     .then((response) => {
  //       console.log("Success");
  //       setListaUsers([
  //         ...listaUsers,
  //         {
  //           username,
  //           passcode,
  //           urlimage,
  //           id_person,
  //         },
  //       ]);
  //       window.location.reload(false);
  //     })
  //     .catch((er) =>{
  //       alert("Disculpe esta ingresando un usuario ya existente")
  //       console.log(er)
  //     });
  // };


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
  .get("http://localhost:80/admin/users", { withCredentials: true })
  .then((res) => {
    console.log("DATA FROM ADMIN: ", res.data);
    setIsData(true);
    setUsers(res.data)
  });

}, [isData])

 return (
 <main>
 <form action="" className="login-form">
          <img  alt="" />
          <div className="form-block">
            <label htmlFor="username">USERNAME</label>
            <input
              type="text"
              id="username"
              placeholder="type the username"
             onChange={handleInputChange}
              name="username"
            />
          </div>
          <div className="form-block">
            <label htmlFor="passcode">Passcode</label>
            <input
              type="password"
              placeholder="*****"
              id="password"
               onChange={handleInputChange}
              name="password"
            />
          </div>
          <div className="form-block">
            <label htmlFor="urlimage">URL Image Profile</label>
            <input
              type="text"
              id="urlimage"
              placeholder="type the url of the image profile"
             onChange={handleInputChange}
              name="urlimage"
              />
          </div>
           <div className="form-block">
            <label htmlFor="id_person">ID Person</label>
            <input
              type="text"
              id="id_person"
              placeholder="type the id of the person"
             onChange={handleInputChange}
              name="id_person"
              />
          </div>
          <input
            type="submit"
            className="button primary-button"
            value="ADD"
          />
          <button
           className="button primary-button"
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
            "Username",
            "Passcode",
            "URL Image",
            "ID Person",
            "Accions"
          ]}
          data={isData?users:null}
          setNeedUpdate={setNeedUpdate}
          handleDeleteUser={null}
          handleUpdateUser={null}
        />
    </div>
    </main>

 )}

export default Users;
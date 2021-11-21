import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../../components/Table";
import "../../styles/table.css";

const Users= () => {
  const [isData, setIsData] = useState(false);
  const [users, setUsers] = useState([]);
  const [updatedUser, setUpdatedUser] = useState({})
  const [listaUsers, setListaUsers] = useState([]);
  const [needUpdate, setNeedUpdate] = useState(false);
  const [username, setUserName]= useState("");
  const [passcode, setPasscode]= useState("");
  const [urlimage, setUrlImage]= useState("");
  const [id_person, setIdPerson]= useState("");

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };


  const addUser = () => {
    axios.post("http://localhost:80/admin/create/users", {
      username,
      passcode,
      id_person,
    })
      .then((response) => {
        console.log("Success");
        setListaUsers([
          ...listaUsers,
          {
            username,
            passcode,
            id_person,
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
  .get("http://localhost:80/admin/users", { withCredentials: true })
  .then((res) => {
    console.log("DATA FROM ADMIN: ", res.data);
    setIsData(true);
    setUsers(res.data)
  });

}, [isData])

const sendInfo = (e) => {
  console.log("Procesando registro");
  e.preventDefault();
  addUser();
};


 return (
 <main>
 <form action="" className="login-form" onSubmit={sendInfo}>
          <img  alt="" />
          <div className="form-block">
            <label htmlFor="username">USERNAME</label>
            <input
              type="text"
              id="username"
              value={username || "" || updatedUser.username}
              placeholder="type the username"
              onChange={(e)=>setUserName(e.target.value)}
              name="username"
            />
          </div>
          <div className="form-block">
            <label htmlFor="passcode">Passcode</label>
            <input
              type="password"
              placeholder="*****"
              id="passcode"
              value={passcode || "" || updatedUser.passcode}
              onChange={(e)=>setPasscode(e.target.value)}
              name="password"
            />
          </div>
          <div className="form-block">
            <label htmlFor="urlimage">URL Image Profile</label>
            <input
              type="text"
              id="urlimage"
              value={urlimage || "" || updatedUser.urlimage}
              placeholder="type the url of the image profile"
              onChange={(e)=>setUrlImage(e.target.value)}
              name="urlimage"
              />
          </div>
          <div className="form-block">
            <label htmlFor="id_person">ID Person</label>
            <input
              type="text"
              id="id_person"
              value={id_person || "" || updatedUser.id_person}
              placeholder="type the url of the image profile"
              onChange={(e)=>setIdPerson(e.target.value)}
              name="id_person"
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
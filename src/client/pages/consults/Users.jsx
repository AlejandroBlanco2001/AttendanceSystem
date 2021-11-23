import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../../components/Table";
import "../../styles/table.css";
import "../../styles/forms.css";

const Users = () => {
  const [isData, setIsData] = useState(false);
  const [users, setUsers] = useState([]);
  const [updatedUser, setUpdatedUser] = useState({})
  const [listaUsers, setListaUsers] = useState([]);
  const [needUpdate, setNeedUpdate] = useState(false);
  const [username, setUserName] = useState("");
  const [passcode, setPasscode] = useState("");
  const [urlimage, setUrlImage] = useState("");
  const [id_pers, setIdPerson] = useState("");

  const handleDeleteUser = (user) => {
    deleteUser([user.username, user.id_pers]);
  }

  const handleUpdateUser = (data) => {
    setUpdatedUser({});
    let inputs = document.getElementsByTagName("input");
    for (let index = 0; index < inputs.length; ++index) {
      inputs[index].value = ""
    }
    console.log("USER TO UPDATE: ", data);
    setUpdatedUser(data);
  }

  const addUser = () => {
    axios.post("http://localhost:80/admin/create/users", {
      username,
      passcode,
      id_pers,
    },{withCredentials: true})
      .then((response) => {
        console.log("Success");
        setListaUsers([
          ...listaUsers,
          {
            username,
            passcode,
            id_pers,
          },
        ]);
        window.location.reload(false);
      })
      .catch((er) => {
        alert("You`re trying to add an user whose primary key is already in existance.")
        console.log(er)
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:80/admin/users", { withCredentials: true })
      .then((res) => {
        console.log("DATA FROM ADMIN: ", res.data);
        setIsData(true)
        setUsers(res.data)
      });

  }, [isData])



  const deleteUser = (id) => {
    axios.post(`http://localhost:80/admin/delete/users/${id[0]}:${id[1]}`, { 1: true }, { withCredentials: true })
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

  const updateUser = () => {
    axios.post(`http://localhost:80/admin/update/users/${updatedUser.username}:${updatedUser.id_pers}`, {
      username: username || updatedUser.username,
      passcode: passcode || updatedUser.passcode,
      urlimage: urlimage || updatedUser.urlimage,
      id_pers: id_pers || updatedUser.id_pers
    }, { withCredentials: true }).then((response) => {
      window.location.reload(true);
      reload();
    });
  };

  const sendInfo = (e) => {
    console.log("Procesando registro");
    e.preventDefault();
    addUser();
  };


  return (
    <main className = "main-users">
      <form onSubmit={sendInfo}>
        <img alt="" />
        <div className="form-block">
          <label htmlFor="username">Username</label>
          <input className="row-form"
            type="text"
            id="username"
            value={username || "" || updatedUser.username}
            placeholder="type the username"
            onChange={(e) => setUserName(e.target.value)}
            name="username"
          />
        </div>
        <div className="form-block">
          <label htmlFor="passcode">Passcode</label>
          <input className="row-form"
            type="text"
            placeholder="*****"
            id="passcode"
            value={passcode || "" || updatedUser.passcode}
            onChange={(e) => setPasscode(e.target.value)}
            name="password"
          />
        </div>
        <div className="form-block">
          <label htmlFor="urlimage">Profile Picture URL</label>
          <input className="row-form"
            type="text"
            id="urlimage"
            value={urlimage || "" || updatedUser.urlimage}
            placeholder="type the url of the profile picture"
            onChange={(e) => setUrlImage(e.target.value)}
            name="urlimage"
          />
        </div>
        <div className="form-block">
          <label htmlFor="id_person">Person's ID</label>
          <input className="row-form"
            type="text"
            id="id_person"
            value={id_pers || "" || updatedUser.id_pers}
            placeholder="type the id of the person"
            onChange={(e) => setIdPerson(e.target.value)}
            name="id_person"
          />
        </div>
        <input
          type="submit"
          className="button primary-button button-row"
          value="ADD"
        />
        <button
          className="button secondary-button button-row"
          onClick={updateUser}
          type="button"
        >
          UPDATE
        </button>
      </form>

      <div className="table">
        <Table
          tableheads={[
            "Username",
            "Passcode",
            "URL Image",
            "Person's ID",
            "Actions"
          ]}
          data={isData ? users : null}
          setNeedUpdate={setNeedUpdate}
          handleDeleteElement={handleDeleteUser}
          handleUpdateElement={handleUpdateUser}
        />
      </div>
    </main>

  )
}

export default Users;
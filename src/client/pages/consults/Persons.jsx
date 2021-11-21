import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../../components/Table";
import "../../styles/table.css";

const Persons= () => {
  const [isData, setIsData] = useState(false);
  const [persons, setPerson] = useState([]);
  const [updatedUser, setUpdatedUser] = useState({})
  const [listaPersons, setListaPersons] = useState([]);
  const [needUpdate, setNeedUpdate] = useState(false);
  const [id, setID]= useState(0);
  const [name1, setName1]= useState("");
  const [name2, setName2]= useState("");
  const [lastName1, setlastName1]= useState("");
  const [lastName2, setlastName2]= useState("");
  const [gender, setGender]=useState("");
  const [birthdate, setBirdthDate]=useState("");
  const [age, setAge]=useState (0);
  const [type, setType]= useState(0);
  const [id_deptP, setIdDept]= useState(0);

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };


  // const addUser = () => {
  //   axios.post("http://localhost:80/admin/create/users", {
  //     username,
  //     passcode,
  //     id_person,
  //   })
  //     .then((response) => {
  //       console.log("Success");
  //       setListaUsers([
  //         ...listaUsers,
  //         {
  //           username,
  //           passcode,
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
  .get("http://localhost:80/admin/persons", { withCredentials: true })
  .then((res) => {
    console.log("DATA FROM ADMIN: ", res.data);
    setIsData(true);
    setPerson(res.data)
  });

}, [isData])

const sendInfo = (e) => {
  console.log("Procesando registro");
  e.preventDefault();
  // addUser();
};


 return (
 <main>
 <form className="login-form" onSubmit={sendInfo}>
          <img  alt="" />
          <div className="form-block">
            <label htmlFor="id">ID</label>
            <input
              type="text"
              id="id"
              value={id || "" || parseInt(updatedUser.id)}
              placeholder="type the ID"
              onChange={(e)=>setID(e.target.value)}
              name="id"
            />
          </div>
          <div className="form-block">
            <label htmlFor="name1">First Name</label>
            <input
              type="text"
              placeholder="type the first name"
              id="name1"
              value={name1 || "" || updatedUser.name1}
              onChange={(e)=>setName1(e.target.value)}
              name="name1"
            />
          </div>
          <div className="form-block">
            <label htmlFor="name2">Second Name</label>
            <input
              type="text"
              id="name2"
              value={name2 || "" || updatedUser.name2}
              placeholder="type the second name"
              onChange={(e)=>setName2(e.target.value)}
              name="name2"
              />
          </div>
          <div className="form-block">
            <label htmlFor="lastName1">First last name</label>
            <input
              type="text"
              id="lastName1"
              value={lastName1 || "" || updatedUser.lastName1}
              placeholder="type the first last name"
              onChange={(e)=>setlastName1(e.target.value)}
              name="lastName1"
              />
          </div>
          <div className="form-block">
            <label htmlFor="lastName2">Second last name</label>
            <input
              type="text"
              id="lastName2"
              value={lastName2 || "" || updatedUser.lastName2}
              placeholder="type the second last name"
              onChange={(e)=>setlastName2(e.target.value)}
              name="lastName2"
              />
          </div>
          <div className="form-block">
            <label htmlFor="gender">Gender</label>
            <input
              type="text"
              id="gender"
              value={gender || "" || updatedUser.gender}
              placeholder="type the first last name"
              onChange={(e)=>setGender(e.target.value)}
              name="gender"
              />
          </div>
          <div className="special-form">
            <label htmlFor="birthdate">Birthdate</label>
            <input
              type="date"
              id="birthdate"
              value={birthdate || "" || updatedUser.birthdate}
              onChange={(e) => setBirdthDate(e.target.value)}
              name="birthdate"
              placeholder="Chose the date"
              disabled={needUpdate}
            />
          </div>
          <div>
          </div>
          <div>
          <label htmlFor="typeP">Type Person</label>
        <input
          type="number"
          id="typeP"
          value={type || 0 || parseInt(updatedUser.type)}
          onChange={(e) => setType(e.target.value)}
          name="type"
          placeholder="Type the type of the person "
          disabled={needUpdate}
        />
          </div>
          <div>
          <label htmlFor="id_dpt">ID departament</label>
        <input
          type="number"
          id="id_dpt"
          value={id_deptP || 0 || parseInt(updatedUser.id_deptP)}
          onChange={(e) => setIdDept(e.target.value)}
          name="id_dpt"
          placeholder="Type the id of the department "
          disabled={needUpdate}
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
            "ID",
            "First Name",
            "Second Name",
            "First Last Name",
            "Second Last Name",
            "Gender",
            "Birthdate",
            "Age",
            "Type Person",
            "ID Departament",
            "Actions"
          ]}
          data={isData?persons:null}
          setNeedUpdate={setNeedUpdate}
          handleDeleteUser={null}
          handleUpdateUser={null}
        />
    </div>
    </main>

 )}

export default Persons;
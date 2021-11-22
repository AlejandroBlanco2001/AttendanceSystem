import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../../components/Table";
import "../../styles/table.css";
import "../../styles/forms.css";

const Persons = () => {
  const [isData, setIsData] = useState(false);
  const [persons, setPerson] = useState([]);
  const [updatedUser, setUpdatedUser] = useState({})
  const [listaPersons, setListaPersons] = useState([]);
  const [needUpdate, setNeedUpdate] = useState(false);
  const [id, setID] = useState(0);
  const [name1, setName1] = useState();
  const [name2, setName2] = useState();
  const [lastName1, setlastName1] = useState();
  const [lastName2, setlastName2] = useState();
  const [gender, setGender] = useState();
  const [birthdate, setBirdthDate] = useState();
  const [age, setAge] = useState();
  const [type, setType] = useState();
  const [id_dept, setIdDept] = useState(0);

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };


  const addPerson = () => {
    axios.post("http://localhost:80/admin/create/persons", {
      id,
      name1,
      name2,
      lastName1,
      lastName2,
      gender,
      birthdate,
      type,
      id_dept
    }, {withCredentials: true }) 
      .then((response) => {
        console.log("Success");
        setListaPersons([
          ...listaPersons,
          {
          id,
          name1,
          name2,
          lastName1,
          lastName2,
          gender,
          birthdate,
          type,
          id_dept
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

  const updateUser = () => {
    Axios.put("http://localhost:3004/update", {
      username: username|| updatedUser.username,
      passcode: passcode || updatedUser.passcode,
      urlimage: urlimage || updatedUser.urlimage,
      id_person: id_person || updatedUser.id_person,
      // Se necesita en caso de que el usuario cambie la cedula en el input o para comparar la informacion actual con la anterior
    }).then((response) => {
      window.location.reload(false);
      reload();
    });
  };

  useEffect(() => {
    axios
      .get("http://localhost:80/admin/persons", { withCredentials: true })
      .then((res) => {
        console.log("DATA FROM ADMIN: ", res.data);
        setIsData(true);
        console.log(res.data)
        setPerson(res.data)
      });

  }, [isData])

const sendInfo = (e) => {
  console.log("Procesando registro");
  e.preventDefault();
  addPerson();
};


 return (
 <main>
 <form className="login-form" onSubmit={sendInfo}>
          <img  alt="" />
          <div className="form-block">
            <label htmlFor="id">ID</label>
            <input
              type="texte"
              id="id"
              value={id || null ||updatedUser.id}
              placeholder="type the ID"
              onChange={(e)=>setID(e.target.value)}
              name="id"
            />
          </div>
          <div className="form-block">
            <label htmlFor="name1">First Name</label>
            <input
              type="texte"
              placeholder="type the first name"
              id="name1"
              value={name1 || null || updatedUser.name1}
              onChange={(e)=>setName1(e.target.value)}
              name="name1"
            />
          </div>
          <div className="form-block">
            <label htmlFor="name2">Second Name</label>
            <input
              type="texte"
              id="name2"
              value={name2 || null || updatedUser.name2}
              placeholder="type the second name"
              onChange={(e)=>setName2(e.target.value)}
              name="name2"
              />
          </div>
          <div className="form-block">
            <label htmlFor="lastName1">First last name</label>
            <input
              type="texte"
              id="lastName1"
              value={lastName1 || null || updatedUser.lastName1}
              placeholder="type the first last name"
              onChange={(e)=>setlastName1(e.target.value)}
              name="lastName1"
              />
          </div>
          <div className="form-block">
            <label htmlFor="lastName2">Second last name</label>
            <input
              type="texte"
              id="lastName2"
              value={lastName2 || null || updatedUser.lastName2}
              placeholder="type the second last name"
              onChange={(e)=>setlastName2(e.target.value)}
              name="lastName2"
              />
          </div>
          <div className="form-block">
            <label htmlFor="gender">Gender</label>
            <select
              id="texte"
              value={gender || null || updatedUser.gender}
              placeholder="type the first last name"
              onChange={(e)=>setGender(e.target.value)}
              disabled={needUpdate}
              name="gender"
              >
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
          </select>
          </div>
          <div className="form-block">
            <label htmlFor="birthdate">Birthdate</label>
            <input
              type="date"
              id="birthdate"
              value={birthdate || null || updatedUser.birthdate}
              onChange={(e) => setBirdthDate(e.target.value)}
              name="birthdate"
              placeholder="Chose the date"
              disabled={needUpdate}
            />
          </div>
          <div className="form-block">
          <label htmlFor="typeP">Type Person</label>
        <select
          type="texte"
          id="typeP"
          value={type || null || updatedUser.type}
          onChange={(e) => setType(e.target.value)}
          name="type"
          placeholder="Type the type of the person "
          disabled={needUpdate}
        >
                <option value="0">Admin</option>
                <option value="1">Teacher</option> 
                <option value="2">Student</option> 

        </select>
          </div>
          <div className="form-block">
          <label htmlFor="id_dpt">ID departament</label>
        <select
          type="texte"
          id="id_dpt"
          value={id_dept || null || updatedUser.id_dept}
          onChange={(e) => setIdDept(e.target.value)}
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
            "ID",
            "First Name",
            "Second Name",
            "First Last Name",
            "Second Last Name",
            "Gender",
            "Birthdate",
            "Age",
            "Person Type",
            "Departament'S ID",
            "Actions"
          ]}
          data={isData ? persons : null}
          setNeedUpdate={setNeedUpdate}
          handleDeleteUser={null}
          handleUpdateUser={null}
        />
      </div>
    </main>

  )
}

export default Persons;
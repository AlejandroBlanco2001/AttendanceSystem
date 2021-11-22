import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Table from "../../components/Table";
import "../../styles/table.css";
import "../../styles/forms.css";
import {myContext} from '../../components/Context';

const Persons = () => {
  const context = useContext(myContext);
  const [isData, setIsData] = useState(false);
  const [persons, setPerson] = useState([]);
  const [updatedPerson, setUpdatedUser] = useState({})
  const [listaPersons, setListaPersons] = useState([]);
  const [needUpdate, setNeedUpdate] = useState(false);
  const [id, setID] = useState(0);
  const [name1, setName1] = useState();
  const [name2, setName2] = useState();
  const [lastname1, setlastName1] = useState();
  const [lastname2, setlastName2] = useState();
  const [gender, setGender] = useState();
  const [birthdate, setBirthDate] = useState();
  const [age, setAge] = useState();
  const [type, setType] = useState();
  const [id_dept, setIdDept] = useState(0);
const handleDeleteUser = (user)=>{
  deletePerson(user.id);
}
  const handleInputChange = (event) => {
    console.log(" ", event.target.name , " : ", event.target.value);
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdateUser = (data) => {
    setUpdatedUser({});
    let inputs = document.getElementsByTagName("input");
    for (let index = 0; index < inputs.length; ++index) {
      inputs[index].value = ""
  }
    console.log("USER TO UPDATE: ", data);
    setUpdatedUser(data);
  }

  const addPerson = () => {
    let aux_id
    if(id_dept == '0'){
      aux_id = null
    }else{
      aux_id =id_dept
    }
    axios.post("http://localhost:80/admin/create/persons", {
      id,
      name1,
      name2,
      lastname1,
      lastname2,
      gender,
      birthdate,
      type,
      aux_id
    }, {withCredentials: true })
      .then((response) => {
        console.log("Success");
        setListaPersons([
          ...listaPersons,
          {
          id,
          name1,
          name2,
          lastname1,
          lastname2,
          gender,
          birthdate,
          type,
          id_dept
          }
        ])
      }).catch((err)=>{
        alert("You`re trying to add a person whose primary key is already in existance.")
        console.log(err)
      })
    }

  const deletePerson = (id) => {
    console.log("contex user in delete: ", context.user);
    axios.post(`http://localhost:80/admin/delete/persons/${id}`,{1: true},{withCredentials: true})
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
  
  const updatePerson = () => {
    axios.post(`http://localhost:80/admin/update/persons/${updatedPerson.id}`, {
      id: id || updatedPerson.id,
      name1: name1 || updatedPerson.name1,
      name2: name2 || updatedPerson.name2,
      lastname1: lastname1 || updatedPerson.lastname1, 
      lastname2: lastname2 || updatedPerson.lastname2,
      gender: gender || updatedPerson.gender,
      birthdate: birthdate || updatedPerson.birthdate,
      type: type || updatedPerson.type,
      id_dept: id_dept || updatedPerson.id_dept
    }, {withCredentials: true}).then((response) => {
      window.location.reload(true);
      reload();
    });
  };

  useEffect(() => {
    axios
      .get("http://localhost:80/admin/persons", { withCredentials: true })
      .then((res) => {
        res.data.forEach(person => {
          person.birthdate = person.birthdate.split('T')[0]
        });
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
              value={id || null ||updatedPerson.id}
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
              value={name1 || null || updatedPerson.name1}
              onChange={(e)=>setName1(e.target.value)}
              name="name1"
            />
          </div>
          <div className="form-block">
            <label htmlFor="name2">Second Name</label>
            <input
              type="text"
              id="name2"
              value={name2 || null|| updatedPerson.name2}
              placeholder="type the second name"
              onChange={(e)=>setName2(e.target.value)}
              name="name2"
              />
          </div>
          <div className="form-block">
            <label htmlFor="lastname1">First last name</label>
            <input
              type="text"
              id="lastname1"
              value={lastname1 || null || updatedPerson.lastname1}
              placeholder="type the first last name"
              onChange={(e)=>setlastName1(e.target.value)}
              name="lastname1"
              />
          </div>
          <div className="form-block">
            <label htmlFor="lastname2">Second last name</label>
            <input
              type="texte"
              id="lastname2"
              value={lastname2 || null || updatedPerson.lastname2}
              placeholder="type the second last name"
              onChange={(e)=>setlastName2(e.target.value)}
              name="lastname2"
              />
          </div>
          <div className="form-block">
            <label htmlFor="gender">Gender</label>
            <select
              id="texte"
              value={gender || " " || updatedPerson.gender}
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
              value={birthdate || "" || updatedPerson.birthdate}
              onChange={(e) => setBirthDate(e.target.value)}
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
          value={type || null || updatedPerson.type}
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
          value={id_dept || null || updatedPerson.id_dept == null ? "0": updatedPerson.id_dept}
          onChange={(e) => setIdDept(e.target.value)}
          name="id_dpt"
          placeholder="Type the id of the department "
          disabled={needUpdate}
        >
                <option value="0" selected >None</option>
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
          onClick={updatePerson}
          // disabled={!needUpdate}
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
          handleDeleteUser={handleDeleteUser}
          handleUpdateUser={handleUpdateUser}
        />
      </div>
    </main>

  )
}

export default Persons;


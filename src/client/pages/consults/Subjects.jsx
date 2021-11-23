import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../../components/Table";
import "../../styles/table.css";
import "../../styles/forms.css";

const Subjects= () => {
  const [isData, setIsData] = useState(false);
  const [subjects, setSubject] = useState([]);
  const [updatedUser, setUpdatedSubject] = useState({})
  const [listaSubjects, setListaSubjects] = useState([]);
  const [needUpdate, setNeedUpdate] = useState(false);
  const [code, setCode]= useState("");
  const [name, setName]= useState("");
  const [credits, setCredits]= useState(0);
  const [description, setDescription]= useState("");
  const [type, setType]= useState("");
  const [urlimage, setUrlImage]= useState("");
  const [id_dept, setID]= useState();


  const handleDeleteSubject = (user) => {
    deleteSubject([user.code, user.id_dept]);
  }

  const handleUpdateSubject = (data) => {
    setUpdatedSubject({});
    let inputs = document.getElementsByTagName("input");
    for (let index = 0; index < inputs.length; ++index) {
      inputs[index].value = ""
    }
    console.log("USER TO UPDATE: ", data);
    setUpdatedSubject(data);
  }

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
        alert("You`re trying to add a subject whose primary key is already in existance.")
        console.log(er)
      });
  };

  const deleteSubject = (id) => {
    axios.post(`http://localhost:80/admin/delete/subjects/${id[0]}:${id[6]}`, { 1: true }, { withCredentials: true })
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

  const updateSubject = () => {
    axios.post(`http://localhost:80/admin/update/subjects/${updatedUser.code}:${updatedUser.id_dept}`, {
      code: code|| updatedUser.code,
      name: name || updatedUser.name,
      credits: credits || updatedUser.credits,
      type: type || updatedUser.type,
      urlimage: urlimage || updatedUser.urlimage,
      id_dept: id_dept || updatedUser.id_dept
    }, { withCredentials: true }).then((response) => {
      window.location.reload(true);
      reload();
    });
  };

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
 <main className="main-users">
 <form  onSubmit={sendInfo}>
          <img  alt="" />
          <div className="form-block">
            <label htmlFor="code">Subject's Code</label>
            <input className="row-form"
              type="text"
              id="code"
              value={code || "" || updatedUser.code}
              placeholder="type the code of the Subject"
              onChange={(e)=>setCode(e.target.value)}
              name="code"
            />
          </div>
          <div className="form-block">
            <label htmlFor="name">Subject's Name</label>
            <input className="row-form"
              type="text"
              placeholder="type the name of the subject"
              id="name"
              value={name || "" || updatedUser.name}
              onChange={(e)=>setName(e.target.value)}
              name="name"
            />
          </div>
          <div className="form-block">
            <label htmlFor="credits">No. of Credits</label>
            <input className="row-form"
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
            <input className="row-form"
              type="text"
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
              type="text"
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
            <input className="row-form"
              type="text"
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
          type="text"
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
          onClick={updateSubject}
          type="button"
        >
       UPDATE
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
          handleDeleteUser={handleDeleteSubject}
          handleUpdateUser={handleUpdateSubject}
        />
    </div>
    </main>

 )}

export default Subjects;
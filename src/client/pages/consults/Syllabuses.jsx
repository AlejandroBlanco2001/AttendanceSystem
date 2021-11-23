import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../../components/Table";
import "../../styles/table.css";

const Syllabus= () => {
  const [isData, setIsData] = useState(false);
  const [syllabuses, setSyllabuses] = useState([]);
  const [updatedUser, setUpdatedSyllabus] = useState({})
  const [listaSyllabuses, setListaSyllabuses] = useState([]);
  const [needUpdate, setNeedUpdate] = useState(false);
  const [code, setCodeSy]= useState("");
  const [snies_prog, setSniesProg]= useState("");

  const handleDeleteSyllabus = (syllabus) => {
    deleteSyllabus(syllabus.code);
  }

  const handleUpdateSyllabus = (syllabus) => {
    setUpdatedSyllabus({});
    let inputs = document.getElementsByTagName("input");
    for (let index = 0; index < inputs.length; ++index) {
      inputs[index].value = ""
    }
    console.log("USER TO UPDATE: ", syllabus);
    setUpdatedSyllabus(syllabus);
  }


  const addSyllabus = () => {
    axios.post("http://localhost:80/admin/create/syllabuses", {
      code,
      snies_prog,
    })
      .then((response) => {
        console.log("Success");
        setListaSyllabuses([
          ...listaSyllabuses,
          {
            code,
            snies_prog
          },
        ]);
        window.location.reload(false);
      })
      .catch((er) =>{
        alert("You`re trying to add a syllabus whose primary key is already in existance.")
        console.log(er)
      });
  };

  const deleteSyllabus = (id) => {
    axios.post(`http://localhost:80/admin/delete/syllabuses/${id}`, { 1: true }, { withCredentials: true })
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
    axios.post(`http://localhost:80/admin/update/syllabuses/${updatedUser.code}`, {
      code: code|| updatedUser.code,
      snies_prog: snies_prog || updatedUser.snies_prog,
    }, { withCredentials: true }).then((response) => {
      window.location.reload(true);
      reload();
    });
  };

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
  addSyllabus();
};


 return (
 <main className="main-users">
 <form  onSubmit={sendInfo}>
          <img  alt="" />
          <div className="form-block">
            <label htmlFor="code">Syllabus' Code</label>
            <input className="row-form"
              type="text"
              id="code"
              value={code || "" || updatedUser.code}
              placeholder="type the code of the Syllabus"
              onChange={(e)=>setCodeSy(e.target.value)}
              name="code"
            />
          </div>
          <div className="form-block">
            <label htmlFor="snies_prog">Program's SNIES</label>
            <input className="row-form"
              type="text"
              placeholder="type the SNIES of the program"
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
           className="button secondary-button button-row"
          // onClick={updateUser}
          disabled={!needUpdate}
          type="button"
        >
        UPDATE
        </button>
        </form>  
        
    <div className="table">
        <Table
          tableheads={[
            "Syllabus' Code",
            "Program's SNIES",
            "Actions"
          ]}
          data={isData?syllabuses:null}
          setNeedUpdate={setNeedUpdate}
          handleDeleteElement={handleDeleteSyllabus}
          handleUpdateElement={handleUpdateSyllabus}
        />
    </div>
    </main>

 )}

export default Syllabus;
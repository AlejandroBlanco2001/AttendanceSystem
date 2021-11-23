import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../../components/Table";
import "../../styles/table.css";

const Periods= () => {
  const [isData, setIsData] = useState(false);
  const [periods, setPeriods] = useState([]);
  const [updatedUser, setUpdatedPeriod] = useState({})
  const [listaPeriods, setListaPeriods] = useState([]);
  const [needUpdate, setNeedUpdate] = useState(false);
  const [year, setYear]= useState();
  const [term, setTerm]= useState();
  const [description, setDescription]= useState("");

  const handleDeletePeriod = (period) => {
    deletePeriod([period.year, period.term]);
  }

  const handleUpdatePeriod = (period) => {
    setUpdatedPeriod({});
    let inputs = document.getElementsByTagName("input");
    for (let index = 0; index < inputs.length; ++index) {
      inputs[index].value = ""
    }
    console.log("USER TO UPDATE: ", period);
    setUpdatedPeriod(period);
  }

  const addPeriod = () => {
    axios.post("http://localhost:80/admin/create/periods", {
     year,
     term,
     description
    })
      .then((response) => {
        console.log("Success");
        setListaPeriods([
          ...listaPeriods,
          {
            year,
            term,
            description
          },
        ]);
        window.location.reload(false);
      })
      .catch((er) =>{
        alert("You`re trying to add a period whose primary key is already in existance.")
        console.log(er)
      });
  };


useEffect(() => {
  axios
  .get("http://localhost:80/admin/periods", { withCredentials: true })
  .then((res) => {
    console.log("DATA FROM ADMIN: ", res.data);
    setIsData(true);
    setPeriods(res.data)
  });

}, [isData])

const sendInfo = (e) => {
  console.log("Procesando registro");
  e.preventDefault();
  addPeriod();
};

const deletePeriod = (id) => {
  axios.post(`http://localhost:80/admin/delete/periods/${id[0]}:${id[1]}`, { 1: true }, { withCredentials: true })
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

const updatePeriod = () => {
  axios.post(`http://localhost:80/admin/update/periods/${updatedUser.year}:${updatedUser.term}`, {
    year: year|| updatedUser.year,
    term: term || updatedUser.term,
    description: description || updatedUser.description,
  }, { withCredentials: true }).then((response) => {
    window.location.reload(true);
    reload();
  });
};



 return (
 <main className="main-users">
 <form onSubmit={sendInfo}>
          <img  alt="" />
          <div className="form-block">
            <label htmlFor="year">Year</label>
            <input className="row-form"
              type="text"
              id="year"
              value={year || "" || updatedUser.year}
              placeholder="type the year"
              onChange={(e)=>setYear(e.target.value)}
              name="year"
            />
          </div>
          <div className="form-block">
            <label htmlFor="term">Term</label>
            <select className="row-form"
              type="text"
              placeholder="type the Term"
              id="term"
              value={term|| "" || updatedUser.term}
              onChange={(e)=>setTerm(e.target.value)}
              name="term"
            >
              <option value="01">01</option>
              <option value="02">02</option>
            </select>
          </div>
          <div className="form-block">
            <label htmlFor="description">Period's Description</label>
            <input className="row-form"
              type="text"
              placeholder="type the descriptionof the period"
              id="description"
              value={description || "" || updatedUser.description}
              onChange={(e)=>setDescription(e.target.value)}
              name="description"
            />
          </div>
          <input
            type="submit"
            className="button primary-button button-row"
            value="ADD"
          />
          <button
           className="button primary-button button-row"
          onClick={updatePeriod}
          type="button"
        >
        ACTUALIZAR
        </button>
        </form>  
        
    <div className="table">
        <Table
          tableheads={[
            "Year",
            "Term",
            "Description",
            "Actions"
          ]}
          data={isData?periods:null}
          setNeedUpdate={setNeedUpdate}
          handleDeleteElement={handleDeletePeriod}
          handleUpdateElement={handleUpdatePeriod}
        />
    </div>
    </main>

 )}

export default Periods;
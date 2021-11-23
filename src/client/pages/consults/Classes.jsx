import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../../components/Table";
import "../../styles/table.css";

const Class = () => {
  const [isData, setIsData] = useState(false);
  const [classes, setClasses] = useState([]);
  const [updatedUser, setUpdatedClass] = useState({});
  const [listaClasses, setListaClasses] = useState([]);
  const [needUpdate, setNeedUpdate] = useState(false);
  const [code, setCodeCl] = useState(0);
  const [start_time, setStartTimeCl] = useState();
  const [code_spac, setCodeSpac] = useState("");

  const handleDeleteClass = (clas) => {
    deleteClass(clas.code);
  };

  const handleUpdateClass = (clas) => {
    setUpdatedClass({});
    let inputs = document.getElementsByTagName("input");
    for (let index = 0; index < inputs.length; ++index) {
      inputs[index].value = "";
    }
    console.log("USER TO UPDATE: ", clas);
    setUpdatedClass(clas);
  };

  const addClass = () => {
    axios
      .post("http://localhost:80/admin/create/classes", {
        code,
        start_time,
        code_spac,
      }, { withCredentials: true })
      .then((response) => {
        console.log("Success");
        setListaClasses([
          ...listaClasses,
          {
            code,
            start_time,
            code_spac,
          },
        ]);
        window.location.reload(true);
        reload();
      })
      .catch((er) => {
        alert(
          "You`re trying to add a class whose primary key is already in existance."
        );
        console.log(er);
      });
  };

  const deleteClass = (id) => {
    axios
      .post(
        `http://localhost:80/admin/delete/classes/${id}`,
        { 1: true },
        { withCredentials: true }
      )
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

  const updateClass = () => {
    axios
      .post(
        `http://localhost:80/admin/update/subjects/${updatedUser.code}`,
        {
          code: code || updatedUser.code,
          start_time: start_time || updatedUser.start_time,
          code_spac: code_spac || updatedUser.code,
        },
        { withCredentials: true }
      )
      .then((response) => {
        window.location.reload(true);
        reload();
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:80/admin/classes", { withCredentials: true })
      .then((res) => {
        console.log("DATA FROM ADMIN: ", res.data);
        setIsData(true);
        setClasses(res.data);
      });
  }, [isData]);

  const sendInfo = (e) => {
    console.log("Procesando registro");
    e.preventDefault();
    addClass();
  };

  return (
    <main className="main-users">
      <form onSubmit={sendInfo}>
        <img alt="" />
        <div className="form-block">
          <label htmlFor="start_time">Start Time</label>
          <input
            className="row-form"
            type="text"
            placeholder="type the start time of the class"
            id="start_time"
            value={start_time || "" || updatedUser.start_time}
            onChange={(e) => setStartTimeCl(e.target.value)}
            name="start_time"
          />
        </div>
        <div className="form-block">
          <label htmlFor="code_spac">Space's Code</label>
          <input
            className="row-form"
            type="text"
            placeholder="type the code of the Space"
            id="code_spac"
            value={code_spac || "" || updatedUser.code_spac}
            onChange={(e) => setCodeSpac(e.target.value)}
            name="code_spac"
          />
        </div>
        <input
          type="submit"
          className="button primary-button button-row"
          value="ADD"
        />
        <button
          className="button secondary-button button-row"
          onClick={updateClass}
          type="button"
        >
          UPDATE
        </button>
      </form>

      <div className="table">
        <Table
          tableheads={["Class Code", "Start Time", "Space's Code", "Course's code", "Teacher's Code", "Actions"]}
          data={isData ? classes : null}
          setNeedUpdate={setNeedUpdate} 
          handleDeleteElement={handleDeleteClass} 
          handleUpdateElement={handleUpdateClass}
        />
      </div>
    </main>
  );
};

export default Class;

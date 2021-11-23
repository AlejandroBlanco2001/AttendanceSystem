import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../../components/Table";
import "../../styles/table.css";

const Schedules = () => {
  const [isData, setIsData] = useState(false);
  const [schedules, setSchedules] = useState([]);
  const [updatedUser, setUpdatedSchedule] = useState({});
  const [listaSchedules, setListaSchudeles] = useState([]);
  const [needUpdate, setNeedUpdate] = useState(false);
  const [weekday, setWeekday] = useState("");
  const [start_time, setStartTimeSch] = useState("");
  const [duration, setDurationSch] = useState("");

  const handleDeleteSchedule = (schedule) => {
    deleteSchedule([schedule.weekday, schedule.start_time]);
  };

  const handleUpdateSchedule = (schedule) => {
    setUpdatedSchedule({});
    let inputs = document.getElementsByTagName("input");
    for (let index = 0; index < inputs.length; ++index) {
      inputs[index].value = "";
    }
    console.log("USER TO UPDATE: ", schedule);
    setUpdatedSchedule(schedule);
  };

  const addSchedules = () => {
    axios
      .post("http://localhost:80/admin/create/schedules",{
        weekday,
        start_time,
        duration,
      },{withCredentials: true})
      .then((response) => {
        console.log("RESPONSE IN ESQUEDULS ", response);
        console.log("Success");
        setListaSchudeles([
          ...listaSchedules,
          {
            weekday,
            start_time,
            duration,
          },
        ]);
        // window.location.reload(false);
      })
      .catch((er) => {
        alert(
          "You`re trying to add a scehdule whose primary key is already in existance."
        );
        console.log(er);
      });
  };

  const deleteSchedule = (id) => {
    axios
      .post(
        `http://localhost:80/admin/delete/schedules/${id[0]}|${id[1]}`,
        { 1: true },
        { withCredentials: true }
      )
      .then((response) => {
        console.log("Eliminado correctamente");
        console.log("RESPONSE: ", response);
        // window.location.reload(true);
        // reload();
      })
      .catch((err) => {
        console.log("ERROR ELIMINANDO");
        console.log(err);
      });
  };

  const updateSubject = () => {
    console.log(updatedUser);
    axios
      .post(
        `http://localhost:80/admin/update/schedules/${updatedUser.weekday}|${updatedUser.start_time}`,
        {
          weekday: weekday || updatedUser.weekday,
          start_time: start_time || updatedUser.start_time,
          duration: duration || updatedUser.duration,
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
      .get("http://localhost:80/admin/schedules", { withCredentials: true })
      .then((res) => {
        console.log("DATA FROM ADMIN: ", res.data);
        setIsData(true);
        setSchedules(res.data);
      });
  }, [isData]);

  const sendInfo = (e) => {
    console.log("Procesando registro");
    e.preventDefault();
    addSchedules();
  };

  return (
    <main className="main-users">
      <form onSubmit={sendInfo}>
        <img alt="" />
        <div className="form-block">
          <label htmlFor="weekday">Weekday</label>
          <select
            type="text"
            id="weekday"
            value={weekday || "" || updatedUser.weekday}
            placeholder="type the day of the week"
            onChange={(e) => setWeekday(e.target.value)}
            name="weekday"
          >
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
          </select>
        </div>
        <div className="form-block">
          <label htmlFor="start_time">Start time</label>
          <input
            className="row-form"
            type="text"
            placeholder="type the Start Time"
            id="start_time"
            value={start_time || "" || updatedUser.start_time}
            onChange={(e) => setStartTimeSch(e.target.value)}
            name="start_time"
          />
        </div>
        <div className="form-block">
          <label htmlFor="duration">Duration</label>
          <input
            className="row-form"
            type="text"
            placeholder="type the Duration of the class"
            id="duration"
            value={duration || "" || updatedUser.duration}
            onChange={(e) => setDurationSch(e.target.value)}
            name="duration"
          />
        </div>
        <input
          type="submit"
          className="button primary-button button-row"
          value="ADD"
        />
        <button
          className="button secondary-button button-row"
          onClick={updateSubject}
          type="button"
        >
          UPDATE
        </button>
      </form>

      <div className="table">
        <Table
          tableheads={[
            "Weekday",
            "Start time",
            "Duration",
            "End time",
            "Accions",
          ]}
          data={isData ? schedules : null}
          setNeedUpdate={setNeedUpdate}
          handleDeleteElement={handleDeleteSchedule}
          handleUpdateElement={handleUpdateSchedule}
        />
      </div>
    </main>
  );
};

export default Schedules;

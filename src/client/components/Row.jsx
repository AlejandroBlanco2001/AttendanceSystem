import React, { useState } from "react";

const Row = ({
  data,
  setNeedUpdate,
  handleDeleteUser,
  handleUpdateUser,
  collection,
}) => {
  return (
    <tr>
      {(data ? Object.entries(data).map((value, index)=>{ return(<td key = {index}>{value[1]}</td>)}) : <></>)}
      <td className="select">
        <button
          className=" button primary-button button-row"
          onClick={() => {
            //handleDeleteUser(collection.cedula || collection.tarjetaIdentidad);
          }}
        >
          ELIMINAR
        </button>

        <button className="
        button secondary-button button-row"
          onClick={() => {
           // handleUpdateUser(collection);
          }}
        >
          EDITAR
        </button>
        </td>
        
     
    </tr>
  );
};

export default Row;

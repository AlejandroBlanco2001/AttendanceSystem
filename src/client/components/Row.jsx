import React, { useState } from "react";

const Row = ({
  data,
  setNeedUpdate,
  handleDeleteElement,
  handleUpdateElement,
  collection,
}) => {
  return (
    <tr>
      {(data ? Object.entries(data).map((value, index)=>{ return(<td key = {index}>{value[1]}</td>)}) : <></>)}
      <td className="select">
        <button
          className=" button primary-button button-row"
          onClick={() => {
            handleDeleteElement(collection)
          }}
        >
          DELETE
        </button>

        <button className="
        button secondary-button button-row"
          onClick={() => {
           handleUpdateElement(collection);
          }}
        >
          EDIT
        </button>
        </td>
        
     
    </tr>
  );
};

export default Row;

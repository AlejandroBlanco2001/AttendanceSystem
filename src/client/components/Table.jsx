import React, { useState } from "react";
import Row from "./Row";

const Table = ({
  tableheads,
  data,
  setNeedUpdate,
  handleDeleteElement,
  handleUpdateElement,

}) => {
  return (
    <table>
      <thead>
        <tr>
          {
          (tableheads?
          tableheads.map((header) => {
            return <th>{header}</th>;
          })
          :<></>
          )
          }
        </tr>
      </thead>

      <tbody>
        {
        (data?
        data.map((row) => {
          return (
            <Row
              data={row}
              collection={row}
              setNeedUpdate
              handleDeleteElement={handleDeleteElement}
              handleUpdateElement={handleUpdateElement} 
            />
          );
        })
        : <></>)
      }
      </tbody>
    </table>
  );
};

export default Table;

import React, { useState } from "react";
import Row from "./Row";

const Table = ({
  tableheads,
  data,
  setNeedUpdate,
  handleDeleteUser,
  handleUpdateUser,

}) => {
console.log("DATA IN TABLE ", data)
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
              handleDeleteUser={handleDeleteUser}
              handleUpdateUser={handleUpdateUser}
              ced={row.cedula}
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

import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

function RowDetails({ Email, Lastname, Firstname, Age, Id, OnDelete })  { 
    const navigate=useNavigate()
    const handleEdit=()=>{
        navigate("/admin/editUser", {
            state:{userId:Id}
        })

    }
  return (
    <tr>
      <th>{Email}</th>
      <td>{Lastname}</td>
      <td>{Firstname}</td>
      <td>{Age}</td>
      <td className="gap__actions">
        <span className="badge bg-info">
          {/* <Link to={`editUser/${Id}`} className="text-white"> */}
          <button onClick={handleEdit}>
            <i className="fas fa-edit"></i>
            </button>
        </span>

        <span className="badge bg-danger" onClick={() => OnDelete(Id)}>
          <i className="fas fa-trash-alt"></i>
        </span>
      </td>
    </tr>
  );
}

export default RowDetails;

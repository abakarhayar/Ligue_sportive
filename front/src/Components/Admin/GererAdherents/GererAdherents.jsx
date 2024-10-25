import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom"
import './GererAdherents.css';

const GererAdherents = () => {
  
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/users").then((response) => {
      setUsers(response.data);
    });
  }, []);

  const deleteUsers = async (UsersId) => {
    try {
      const confirmation = window.confirm(
        "Are you sure you want to delete this users?"
      );
      if (!confirmation) return;

      const response = await axios.delete(
        `http://localhost:8080/Users/${UsersId}`
      );

      if (response.status === 200) {
        alert("Users deleted");
        setUsers(
          users.filter(
            (user) => user._id !== UsersId
          )
        );
      } else {
        console.error("User deletion failed");
      }
    } catch (error) {
      console.error("Error during user deletion:", error);
    }
  };

  return (
    <ul>
      <h1>Liste des utilisateur:</h1>
      {users.map((user) => {
        return(
          <li key={user.id}>
            <div className="User-bloc">
              <h2 >{user.name}</h2>
              <p>Email: <span className="User-Email">{user.email}</span></p>
              <p >Rôle: {user.role}</p>
              <button onClick={() => deleteUsers(user._id)} >Supprimer</button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default GererAdherents;


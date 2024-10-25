import React, { useState } from "react";
import { Link } from "react-router-dom";
import './Inscription.css'

const Register = () => {
  const [role,setRole] = useState('')
  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const name = event.target.name.value;
    const role = event.target.role.value;

    try {
      const response = await fetch("http://localhost:8080/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name, role }),
      });

      if (response.ok) {
        alert("Registration successful");
        window.location.href = "/connexion";
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="container-lgn">
      <div className="auth-container">
        <h2>Inscription</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" required />
          <input type="email" name="email" placeholder="Email" required />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
                  <select
                      name="role"
                      id="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      required
                  >
                      <option value="user">Adhérent</option>
                      <option value="admin">Administrateur</option>
                  </select>
          <button type="submit">Inscription</button>
        </form>
        <div className="redirect-link">
          Déjà inscrit ? <Link to="/connexion">Connectez-vous</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
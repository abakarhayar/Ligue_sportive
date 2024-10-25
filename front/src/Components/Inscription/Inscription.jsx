// register component on localhost:8080/users/register endpoint

import React from "react";
import { Link, useLocation } from "react-router-dom";

const Register = () => {
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
    <div>
      <h1>Inscription</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" required />
        <input type="email" name="email" placeholder="Email" required />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <select name="role" id="role" required>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Inscription</button>
      </form>
      <Link to="/connexion">Connexion</Link>
    </div>
  );
};

export default Register;
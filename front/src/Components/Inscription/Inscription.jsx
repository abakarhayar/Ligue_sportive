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
      const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name, role }),
      });

      if (response.ok) {
        alert("Registration successful");
        window.location.href = "/";
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" required />
        <input type="email" name="email" placeholder="Email" required />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <input type="number" name="role" placeholder="Role" required />
        <button type="submit">Register</button>
      </form>
      <Link to="/">Login</Link>
    </div>
  );
};

export default Register;
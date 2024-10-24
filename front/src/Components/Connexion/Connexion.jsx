import axios from "axios";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Login = () => {

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      const response = await axios.post("http://localhost:8080/login", {
        email,
        password,
      });

      if (response.status === 200) {
        console.log(response.data);

        const userId = response.data.userId;
        localStorage.setItem("userId", userId);
        
        alert("Login successful");
        window.location.href = "/Produit";
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
      }
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" required />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      <Link to="/register">Register</Link>
    </div>
  );
};

export default Login;
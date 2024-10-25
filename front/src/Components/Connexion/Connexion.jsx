import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import './Connexion.css'

const Login = () => {

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      const response = await axios.post("http://localhost:8080/users/login", {
        email,
        password,
      });

      if (response.status === 200) {
        console.log(response.data);

        const userId = response.data.userId;
        localStorage.setItem("userId", userId);
        
        alert("Login successful");
        window.location.href = "/produit";
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
    <div className="container-lgn">
      <div className="auth-container">
        <h2>Connexion</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email" required />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <button type="submit">Connexion</button>
        </form>
        <div className="redirect-link">
            Pas encore de compte ? <Link to="/Inscription">Inscription</Link>
        </div>
      </div>
    </div>

  );
};

export default Login;
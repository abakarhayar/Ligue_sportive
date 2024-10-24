import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom"
import './Home.css';

const Produit = () => {
  
  const [produits, setProduits] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/").then((response) => {
      setProduits(response.data);
    });
  }, []);

  return (
    <ul>
      <h1>Liste des publications:</h1>
      {produits.map((produit) => {
        return(
          <li key={produit.id}>
            <div className="produit-bloc">
              <h2>{produit.name}</h2>
              <p className="category">{produit.category.name}</p>
              <p className="produit-bloc-content">{produit.description}</p>
              <p>{produit.available}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Produit;
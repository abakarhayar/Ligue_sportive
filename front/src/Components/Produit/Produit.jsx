import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom"
import './Produit.css';

const Produit = () => {
  
  const [produits, setProduits] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/materiels").then((response) => {
      setProduits(response.data);
    });
  }, []);

  return (
    <ul>
      <h1>Liste des matériels sportif:</h1>
      {produits.map((produit) => {
        return(
          <li key={produit.id}>
            <div className="product-bloc">
              <h2 className="product-name">{produit.name}</h2>
              <p className="product-category">Category: @{produit.category}</p>
              <p className="product-bloc-description">{produit.description}</p>
              <p>Available: {produit.available}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Produit;
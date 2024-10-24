import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom"
import './Home.css';

const Home = () => {
  
  const [publications, setPublications] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/publication/getpublication").then((response) => {
      setPublications(response.data);
    });
  }, []);

  return (
    <ul>
      <h1>Liste des publications:</h1>
      {publications.map((publication) => {
        const formattedDate = new Date(publication.date).toISOString().split('T')[0];
        return(
          <li key={publication.id}>
            <div className="publication-bloc">
              <p className="author">@{publication.author.name}</p>
              <h2>{publication.title}</h2>
              <p className="publication-bloc-content">{publication.content}</p>
              <p className="publication-date">{formattedDate}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Home;
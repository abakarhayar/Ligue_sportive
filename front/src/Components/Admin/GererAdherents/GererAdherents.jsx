import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom"
import './MyPublication.css';

const MyPublication = () => {

    const userId = localStorage.getItem("userId");
    const [publications, setPublications] = useState([]);
    const [PublicationByUserId, setPublicationByUserId] = useState([]);
    const [editingPublication, setEditingPublication] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editContent, setEditContent] = useState("");

    useEffect(() => {
        axios.get("http://localhost:8080/publication/getpublication").then((response) => {
            setPublications(response.data);
        });
      }, []);

    useEffect(() => {
        axios.get(`http://localhost:8080/publication/getpublicationbyuserid/${userId}`).then((response) => {
            setPublicationByUserId(response.data);
        });
    }, []);

    const createPublication = async (event) => {
        event.preventDefault();
    
        const title = event.target.title.value;
        const content = event.target.content.value;
    
        try {
            const response = await axios.post(
                "http://localhost:8080/publication/create",
                {
                    title,
                    content,
                    author: userId,
                }
            );
    
            if (response.status === 201) {
                alert("Publication created");
                setPublications([...publications, response.data]);
            } else {
                console.error("Publication creation failed");
            }
        } catch (error) {
          console.error("Error during publication creation:", error);
        }
    };

    const deletePublication = async (publicationId) => {
        try {
            const confirmation = window.confirm(
                "Are you sure you want to delete this publication?"
            );
            if (!confirmation) return;
    
            const response = await axios.delete(
                `http://localhost:8080/publication/delete/${publicationId}`
            );
    
            if (response.status === 200) {
                alert("Publication deleted");
                setPublications(
                    publications.filter(
                        (publication) => publication._id !== publicationId
                    )
                );
            } else {
                console.error("Publication deletion failed");
            }
        } catch (error) {
            console.error("Error during publication deletion:", error);
        }
    };

    const handleEditClick = (publication) => {
        setEditingPublication(publication._id);
        setEditTitle(publication.title);
        setEditContent(publication.content);
    };

    const updatePublication = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(
                `http://localhost:8080/publication/update/${editingPublication}`,
                {
                    title: editTitle,
                    content: editContent,
                }
            );
    
            if (response.status === 200) {
                alert("Publication updated");
    // le setPublication permet de créer un nouveau .map avec les données mis à jour 
                setPublicationByUserId(
                    PublicationByUserId.map((publication) =>
                        publication._id === editingPublication
                        ? { ...publication, title: editTitle, content: editContent }
                        : publication
                    )
                );
                setEditingPublication(null); // Réinitialiser l'édition après succès
            } else {
                console.error("Publication update failed");
            }
        } catch (error) {
            console.error("Error during publication update:", error);
        }
    };
    
    return (
        <ul>
            <h1>Nouvelle publication:</h1>
            <form onSubmit={createPublication} className="newpublication-bloc">
                <input className="newpublication-titre" type="text" name="title" placeholder="Title" required />
                <textarea className="newpublication_content" name="content" placeholder="Content" required />
                <button type="submit">Create publication</button>
            </form>
            <h1>Liste de mes publications:</h1>
            {PublicationByUserId.map((publication) => {
                const formattedDate = new Date(publication.date).toISOString().split('T')[0];
                return(
                    <li key={publication.id}>
                        <div className="my-publication-bloc">
                            {editingPublication === publication._id ? (
                                <form onSubmit={updatePublication}>
                                    <input className="newpublication-titre" type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} required />
                                    <textarea className="newpublication_content" value={editContent} onChange={(e) => setEditContent(e.target.value)} required />
                                    <button type="submit">Update Publication</button>
                                </form>
                            ) : (
                                <div>
                                    <h2>{publication.title}</h2>
                                    <p className="my-publication-bloc-content">{publication.content}</p>
                                </div>
                            )}
                            <p className="my-publication-date">{formattedDate}</p>
                            <button onClick={() => handleEditClick(publication)} >Modifier</button>
                            <button onClick={() => deletePublication(publication._id)} >Supprimer</button>
                        </div>
                    </li>
                );
            })}
        </ul>
      );

};

export default MyPublication;


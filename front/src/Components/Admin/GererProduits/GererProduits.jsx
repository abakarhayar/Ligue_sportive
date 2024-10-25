import React, {useEffect, useState} from "react";
import axios from "axios";
import './GererProduits.css';

const GererProduits = () => {
  
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [editName, setEditName] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editCategory, setEditCategory] = useState("");
    const [editAvailable, setEditAvailable] = useState("");
  
    useEffect(() => {
      axios.get("http://localhost:8080/materiels").then((response) => {
        setProducts(response.data);
      });
    }, []);

    const createProduct = async (event) => {
      event.preventDefault();
  
      const name = event.target.name.value;
      const category = event.target.category.value;
      const description = event.target.description.value;
      const available = event.target.available.value;
  
      try {
        const response = await axios.post(
          "http://localhost:8080/materiels",
          {
            name,
            category,
            description,
            available,
          }
        );
  
        if (response.status === 201) {
          alert("Product created");
          setProducts([...products, response.data]);
        } else {
          console.error("Product creation failed");
        }
      } catch (error) {
        console.error("Error during Product creation:", error);
      }
    };
  
    const deleteProduct = async (productId) => {
      try {
        const confirmation = window.confirm(
          "Are you sure you want to delete this product?"
        );
        if (!confirmation) return;
  
        const response = await axios.delete(
          `http://localhost:8080/materiels/${productId}`
        );
  
        if (response.status === 200) {
          alert("Product deleted");
          setProducts(
            products.filter(
              (product) => product._id !== productId
            )
          );
        } else {
          console.error("Product deletion failed");
        }
      } catch (error) {
        console.error("Error during product deletion:", error);
      }
    };
  
    const handleEditClick = (product) => {
      setEditingProduct(product._id);
      setEditName(product.name);
      setEditDescription(product.description);
      setEditCategory(product.category);
      setEditAvailable(product.available);
    };
  
    const updateProduct = async (event) => {
      event.preventDefault();
      try {
        const response = await axios.put(
          `http://localhost:8080/${editingProduct}`,
          {
            name: editName,
            description: editDescription,
            category: editCategory,
            available: editAvailable,
          }
        );
        if (response.status === 200) {
          alert("Product updated");
          setProducts(
            products.map((product) =>
              product._id === editingProduct
              ? { ...product, name: editName, description: editDescription, category: editCategory, available: editAvailable }
              : product
            )
          );
          setEditingProduct(null);
        } else {
          console.error("Product update failed");
        }
      } catch (error) {
        console.error("Error during product update:", error);
      }
    };
  
    return (
      <ul>
        <h1>Formulaire: nouveau produit</h1>
        <form onSubmit={createProduct} className="newproduct-bloc">
          <input className="newproduct-name" type="text" name="name" placeholder="Nom du produit" required />
          <input className="newproduct-category" type="text" name="category" placeholder="Catégorie du produit" required/>
          <textarea className="newproduct-description" name="description" placeholder="Description du produit" required />
          <input className="newproduct-available" type="text" name="available" placeholder="Reste-il des produits ?" required />
          <button type="submit">Ajouter le produit</button>
        </form>
        <h1>Liste des produits:</h1>
        {products.map((product) => {
          return(
            <li key={product.id}>
              <div className="product-bloc">
              {editingProduct === product._id ? (
                <form onSubmit={updateProduct}>
                  <input className="newproduct-name" type="text" value={editName} onChange={(e) => setEditName(e.target.value)} required placeholder="Nom du produit"/>
                  <input className="newproduct-category" type="text" value={editCategory} onChange={(e) => setEditCategory(e.target.value)} required placeholder="Catégorie du produit"/>
                  <textarea className="newproduct-description" value={editDescription} onChange={(e) => setEditDescription(e.target.value)} placeholder="Description du produit"/>
                  <input className="newproduct-available" type="text" value={editAvailable} onChange={(e) => setEditAvailable(e.target.value)} required placeholder="Reste-il des produits ?"/>
                  <button type="submit">Update Product</button>
                  <p></p>
                </form>
              ) : (
                <div>
                  <h2 className="product-name">{product.name}</h2>
                  <p className="product-category">category: @{product.category}</p>
                  <p className="product-bloc-description">{product.description}</p>
                  <p >available: {product.available}</p>
                </div>
              )}
                <button onClick={() => handleEditClick(product)} >Modifier</button>
                <button onClick={() => deleteProduct(product._id)} >Supprimer</button>
              </div>
            </li>
          );
        })}
      </ul>
    );
  };
  
  export default GererProduits;


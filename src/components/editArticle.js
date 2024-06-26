import React, { useState, useEffect } from "react";
import { updateArticle, getArticleById } from "../Repository/articlesRepository";
import { useParams } from "react-router-dom";
export default function EditArticle() {
  const { id } = useParams();
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [categorie, setCategorie] = useState("");
  useEffect(() => {
    if (id) {
      handleGetArticleById(id);
    }
  }, [id]);
  const handleUpdateArticle = (event) => {
    event.preventDefault();
    const article = { id, titre, description, categorie };
    updateArticle(article).then((resp) => {
      alert(JSON.stringify(resp.data));
    });
  };

  const handleGetArticleById = (id) => {
    getArticleById(id).then((resp) => {
      setTitre(resp.data.titre);
      setDescription(resp.data.description);
      setCategorie(resp.data.categorie);
    });
  };
  return (
    <div className="p-3">
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleUpdateArticle} method="post">
            <div className="mb-3">
              <label htmlFor="titre" className="form-label">
                Titre
              </label>
              <input
                id="titre"
                type="text"
                className="form-control"
                value={titre}
                onChange={(e) => setTitre(e.target.value)}
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <input
                id="description"
                type="text"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></input>
            </div>
            <div className="mb-3">
            <label htmlFor="categorie" className="form-label">Categorie
              </label>
              <select id="categorie"
                className="form-select"
                aria-label="Default select example"
                value={categorie}
                onChange={(e) => setCategorie(e.target.value)}>
                <option value="" disabled selected>Categorie</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Boissan">Boissan</option>
              </select>
            </div>
            <button className="btn btn-primary">Save</button>
          </form>
        </div>
      </div>
    </div>
  );
}

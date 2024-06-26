import React, { useState } from "react";
import { saveArticle } from "../Repository/articlesRepository";
export default function NewArticle() {
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [categorie, setCategorie] = useState("");
  const handleSaveArticle = (event) => {
    event.preventDefault();
    const article = { titre, description, categorie };
    saveArticle(article).then((resp) => {
      alert(JSON.stringify(resp.data));
    });
  };
  return (
    <div className="p-3">
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSaveArticle} method="post">
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

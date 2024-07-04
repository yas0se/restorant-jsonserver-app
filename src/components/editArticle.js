// src/components/EditArticle.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchArticleById, updateExistingArticle } from "../slice/articleSlice";

export default function EditArticle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentArticle } = useSelector((state) => state.articles);

  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [categorie, setCategorie] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (id) {
      dispatch(fetchArticleById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (currentArticle) {
      setTitre(currentArticle.titre);
      setDescription(currentArticle.description);
      setCategorie(currentArticle.categorie);
    }
  }, [currentArticle]);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleUpdateArticle = async (event) => {
    event.preventDefault();
    try {
      dispatch(updateExistingArticle({ id, articleData: { titre, description, categorie, image, imageUrl: currentArticle.imageUrl } }));
      alert("Article updated successfully!");
      navigate("/articles");
    } catch (error) {
      console.error(error);
      alert("An error occurred while updating the article.");
    }
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
              />
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
              />
            </div>
            <div className="mb-3">
              <label htmlFor="categorie" className="form-label">
                Categorie
              </label>
              <select
                id="categorie"
                className="form-select"
                aria-label="Default select example"
                value={categorie}
                onChange={(e) => setCategorie(e.target.value)}
              >
                <option value="" disabled>
                  Categorie
                </option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Boissan">Boissan</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Image
              </label>
              <input
                id="image"
                type="file"
                className="form-control"
                onChange={handleImageChange}
              />
            </div>
            <button className="btn btn-primary">Save</button>
          </form>
        </div>
      </div>
    </div>
  );
}

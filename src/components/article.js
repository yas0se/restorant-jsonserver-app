// src/components/Articles.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles, removeArticle } from '../slice/articleSlice';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import '../Articles.css';

export default function Articles() {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articles.items);
  const loading = useSelector((state) => state.articles.loading);
  const error = useSelector((state) => state.articles.error);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  const handleDeleteArticle = (id) => {
    if (id) {
      dispatch(removeArticle(id));
    } else {
      console.error('Invalid article id:', id);
    }
  };

  return (
    <div className="p-1 m-1">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className="row">
        {articles.map(article => (
          <div className="col-md-4" key={article.id}>
            <div className="card article-card">
              <img className="card-img-top article-card-img" src={article.imageUrl || 'default-image-url.jpg'} alt="Card image cap" />
              <div className="card-body">
                <h5 className="card-title">{article.titre}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{article.categorie}</h6>
                <p className="card-text">{article.description}</p>
                <a href="#" onClick={() => handleDeleteArticle(article.id)} className="card-link text-danger">
                  <FontAwesomeIcon icon={faTrash} /> Supprimer
                </a>
                <a href="#" onClick={() => navigate(`/editArticle/${article.id}`)} className="card-link text-success">
                  <FontAwesomeIcon icon={faEdit} /> Éditer
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

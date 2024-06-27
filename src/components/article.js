import React, { useState, useEffect } from 'react';
import { getArticles, deleteArticle } from '../Repository/articlesRepository';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import '../Articles.css';

export default function Articles() {

  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    handleGetArticles();
  }, []);

  const handleGetArticles = () => {
    getArticles().then((resp) => {
      setArticles(resp.data);
      setFilteredArticles(resp.data);
    })
      .catch(err => {
        console.log(err);
      });
  };

  const handleDeleteArticle = (id) => {
    deleteArticle(id).then((resp) => {
      handleGetArticles();
    });
  };


  return (
    <div className="p-1 m-1">
      <div className="row">
        {filteredArticles.map(article => (
          <div className="col-md-4" key={article.id}>
            <div className="card article-card" >
              <img className="card-img-top article-card-img" src={article.imageUrl || 'default-image-url.jpg'} alt="Card image cap" />
              <div className="card-body">
                <h5 className="card-title">{article.titre}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{article.categorie}</h6>
                <p className="card-text">{article.description}</p>
                <a href="#" onClick={() => handleDeleteArticle(article)} className="card-link text-danger">
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

// src/components/Home.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles, removeArticle, searchArticles, filterByCategory } from '../slice/articleSlice';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import '../Articles.css';

export default function Home() {
  const [query, setQuery] = useState("");
  const [query2, setQuery2] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const articles = useSelector((state) => state.articles.filteredItems);
  const loading = useSelector((state) => state.articles.loading);
  const error = useSelector((state) => state.articles.error);

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  useEffect(() => {
    dispatch(filterByCategory(query2));
  }, [dispatch, query2]);

  const handleSearch = (event) => {
    event.preventDefault();
    dispatch(searchArticles(query));
  };

  const handleDeleteArticle = (id) => {
    dispatch(removeArticle(id));
  };

  return (
    <div className="p-1 m-2">
      <div className="row">
        <div>
          <div className="card">
            <div className="card-body">
              <div className="card">
                <div className="card-body">
                  <form onSubmit={handleSearch} className="row">
                    <div className="col-auto">
                      <input
                        onChange={(e) => setQuery(e.target.value)}
                        className="form-control"
                        type="text"
                        value={query}
                      />
                    </div>
                    <div className="col-auto">
                      <button className="btn btn-outline-info">
                        <FontAwesomeIcon icon={faSearch} />
                      </button>
                    </div>
                  </form>
                </div>
                <div className="card-body">
                  <form className="row">
                    <div className="col-auto">
                      <select id="categorie"
                        className="form-select"
                        aria-label="Default select example"
                        onChange={(e) => setQuery2(e.target.value)}>
                        <option value="">All Categorie</option>
                        <option value="Breakfast">Breakfast</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Dinner">Dinner</option>
                        <option value="Boissan">Boissan</option>
                      </select>
                    </div>
                  </form>
                </div>
              </div>
              <br />
              <h3>Derniers Articles</h3>
              <div className="p-1 m-1">
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
                <div className="row">
                  {articles.slice().reverse().map(article => (
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

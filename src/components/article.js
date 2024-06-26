import React, { useState, useEffect } from 'react';
import { getArticles, deleteArticle } from '../Repository/articlesRepository';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function Articles() {
  const [query, setQuery] = useState("");
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

  const handleSearch = (event) => {
    // event.preventDefault();
    event.preventDefault();
    const filtered = articles.filter(article => 
      article.titre.toLowerCase().includes(query.toLowerCase()) ||
      article.description.toLowerCase().includes(query.toLowerCase()) ||
      article.categorie.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredArticles(filtered);
  }

  return (
    <div className="p-1 m-1">
      <div className="row">
        <div className="col-md-6">
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
                      ></input>
                    </div>
                    <div className="col-auto">
                      <button className="btn btn-outline-info">
                        <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th>Titre</th>
                    <th>Description</th>
                    <th>Categorie</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredArticles.map(article => (
                    <tr key={article.id}>
                      <td>{article.titre}</td>
                      <td>{article.description}</td>
                      <td>{article.categorie}</td>
                      <td>
                        <button
                          onClick={() => handleDeleteArticle(article)}
                          className="btn btn-outline-danger"
                        >
                          <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => navigate(`/editArticle/${article.id}`)}
                          className="btn btn-outline-success"
                        >
                          <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

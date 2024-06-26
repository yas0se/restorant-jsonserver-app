import React, { useState, useEffect } from 'react';
import { getArticles, deleteArticle} from '../Repository/articlesRepository';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
export default function Articles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    handleGetArticles();
  }, []);

  const handleGetArticles = () => {
    getArticles().then((resp) => {
        setArticles(resp.data);
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
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Titre</th>
                    <th>Description</th>
                    <th>Categorie</th>
                  </tr>
                </thead>
                <tbody>
                  {articles.map(article => (
                    <tr key={article.id}>
                      <td>{article.id}</td>
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

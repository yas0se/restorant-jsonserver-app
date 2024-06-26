import axios from "axios";
import { useState } from "react";

export const api = axios.create({ baseURL: 'http://localhost:9000' });

export const getArticles = () => {
  return api.get(`/articles`);
};
export const getArticleById = (id) => {
  return api.get(`/articles/${id}`);
};
export const saveArticle = (article) => {
  return api.post("/articles", article);
};
export const updateArticle = (article) => {
  return api.put(`/articles/${article.id}`, article);
};
export const deleteArticle = (article) => {
  return api.delete(`/articles/${article.id}`);
};
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
export const updateArticle = (id, article) => {
  return api.put(`/articles/${id}`, article);
};
export const deleteArticle = (id) => {
  return api.delete(`/articles/${id}`);
};
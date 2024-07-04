// src/slices/articlesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getArticles, saveArticle, deleteArticle, updateArticle, getArticleById } from '../Repository/articlesRepository';
import axios from 'axios';

export const fetchArticles = createAsyncThunk('articles/fetchArticles', async () => {
  const response = await getArticles();
  return response.data;
});

export const createArticle = createAsyncThunk('articles/createArticle', async (articleData) => {
  const { titre, description, categorie, image } = articleData;
  const cloud_name = "du1w6cmsb";
  const preset_key = "aauez9ty";
  
  let imageUrl = "";
  
  if (image) {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", preset_key);

    const res = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData);
    imageUrl = res.data.secure_url;
  }
  
  const article = {
    titre,
    description,
    categorie,
    imageUrl,
  };

  const response = await saveArticle(article);
  return response.data;
});

export const fetchArticleById = createAsyncThunk('articles/fetchArticleById', async (id) => {
  const response = await getArticleById(id);
  return response.data;
});

export const updateExistingArticle = createAsyncThunk('articles/updateExistingArticle', async ({ id, articleData }) => {
  const { titre, description, categorie, image } = articleData;
  const cloud_name = "du1w6cmsb";
  const preset_key = "aauez9ty";

  let imageUrl = "";

  if (image) {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", preset_key);

    const res = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData);
    imageUrl = res.data.secure_url;
  }

  const updatedArticle = {
    titre,
    description,
    categorie,
    imageUrl: imageUrl || articleData.imageUrl,
  };

  const response = await updateArticle(id, updatedArticle);
  return response.data;
});

export const removeArticle = createAsyncThunk('articles/removeArticle', async (id) => {
  await deleteArticle(id);
  return id;
});

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    items: [],
    filteredItems: [],
    currentArticle: null,
    loading: false,
    error: null,
  },
  reducers: {
    searchArticles: (state, action) => {
      const query = action.payload.toLowerCase();
      state.filteredItems = state.items.filter(article =>
        article.titre.toLowerCase().includes(query) ||
        article.description.toLowerCase().includes(query) ||
        article.categorie.toLowerCase().includes(query)
      );
    },
    filterByCategory: (state, action) => {
      const query = action.payload.toLowerCase();
      state.filteredItems = state.items.filter(article =>
        article.categorie.toLowerCase().includes(query)
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.filteredItems = action.payload;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createArticle.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.filteredItems.push(action.payload);
      })
      .addCase(fetchArticleById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArticleById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentArticle = action.payload;
      })
      .addCase(fetchArticleById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateExistingArticle.fulfilled, (state, action) => {
        const index = state.items.findIndex(article => article.id === action.payload.id);
        state.items[index] = action.payload;
        state.filteredItems[index] = action.payload;
      })
      .addCase(removeArticle.fulfilled, (state, action) => {
        state.items = state.items.filter(article => article.id !== action.payload);
        state.filteredItems = state.filteredItems.filter(article => article.id !== action.payload);
      });
  },
});

export const { searchArticles, filterByCategory } = articlesSlice.actions;

export default articlesSlice.reducer;

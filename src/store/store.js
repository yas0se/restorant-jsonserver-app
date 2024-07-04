import { configureStore } from '@reduxjs/toolkit';
import articlesReducer from '../slice/articleSlice';

export const store = configureStore({
  reducer: {
    articles: articlesReducer,
  },
});

export default store;

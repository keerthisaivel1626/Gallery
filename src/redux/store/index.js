import {combineReducers, configureStore} from '@reduxjs/toolkit';
import GalleryReducer from '../reducer/GalleryReducer';

const reducer = combineReducers({
  galleryReducer: GalleryReducer,
});

export const store = configureStore({reducer});



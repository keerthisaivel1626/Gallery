import {createSlice} from '@reduxjs/toolkit';

const GalleryReducer = createSlice({
  name: 'galleryReducer',
  initialState: {
    isLogin: false,
    loggedUserData: null,
    profileImage: null,
    clearStyle: 0,
    postsImage: [],
    photosImage: [],
    selectedImage: [],
  },
  reducers: {
    changeAuthStatus(state, action) {
      state.isLogin = action.payload;
    },
    storeLoginDetails(state, action) {
      state.loggedUserData = action.payload;
    },
    manageProfileImage(state, action) {
      state.profileImage = action.payload;
    },
    manageStyle(state, action) {
      state.clearStyle = action.payload;
    },
    managePostsImage(state, action) {
      state.postsImage = action.payload;
    },
    managePhotosImage(state, action) {
      state.photosImage = action.payload;
    },
    manageSelectedGalleryImage(state, action) {
      state.selectedImage = action.payload;
    },
  },
});

export const {
  changeAuthStatus,
  storeLoginDetails,
  manageProfileImage,
  manageStyle,
  managePostsImage,
  managePhotosImage,
  manageSelectedGalleryImage,
} = GalleryReducer.actions;
export default GalleryReducer.reducer;

import { MovieProps } from '@/types/movieType';
import { getStorageItem, setStorageItem } from '@/utils/localStorage';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getGenres, getMovies, getPosterConfig } from './api/api';

const emtyGrade = {original_title: '', user_grade: 0};
const initialState = {
  user_grades: getStorageItem('user_grades') || {},
  isLoad: false,
  isOpenModal: false,
  currentEstimateItem: {...emtyGrade},
  movies: [] as MovieProps[],
  genres: [{id: '', name: ''}],
  postersConfig: {images: { poster_sizes: [] }},
};

const appSlice = createSlice({
  name: 'app',
  initialState: { ...initialState },
  reducers: {
    openEstimateModal: (state, action) => {
      state.isOpenModal = true;
      state.currentEstimateItem = action.payload;
    },
    closeEstimateModal: (state) => {
      state.isOpenModal = false;
      state.currentEstimateItem = {original_title: '', user_grade: 0};
    },
    setCurrentEstimage: (state, action) => {
      const {original_title, user_grade } = action.payload;
      state.currentEstimateItem = {original_title, user_grade};
    },
    setUserGrade: (state, action) => {
      const { original_title, user_grade, operation } = action.payload;
      let currentEstimates = {...state.user_grades};
      if (operation === 'removeGrade') {
        currentEstimates[original_title] = 0;
      } else {
        currentEstimates[original_title] = user_grade;
      }
      state.user_grades = {...currentEstimates};
      setStorageItem('user_grades', currentEstimates);
      state.currentEstimateItem = {...emtyGrade};
      state.isOpenModal = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMovies.fulfilled.toString(), 
      (state, action: PayloadAction<MovieProps[]>) => {
        state.movies = action.payload;
    });
    builder.addCase(getGenres.fulfilled.toString(), (state, action: PayloadAction<{id: string, name: string}[]>) => {
      state.genres = action.payload;
    });
    builder.addCase(getPosterConfig.fulfilled.toString(), (state, action: PayloadAction<{images: { poster_sizes: [] }}>) => {
      state.postersConfig = action.payload;
    });
  },
});
export const { openEstimateModal, setUserGrade, closeEstimateModal, setCurrentEstimage } = appSlice.actions;
export default appSlice.reducer;

import { MovieProps } from '@/types/movieType';
import { getStorageItem } from '@/utils/localStorage';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getGenres, getMovies, getPosterConfig } from './api/api';


const initialState = {
  user_grades: [],
  isLoad: false,
  movies: [] as MovieProps[],
  genres: [{id: '', name: ''}],
  postersConfig: {images: { poster_sizes: [] }},
};

const appSlice = createSlice({
  name: 'app',
  initialState: { ...initialState },
  reducers: {
    // addUserGrade: (state, action) => {
    // }
    // removeUserGrade: (state, action) => {

    // }
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
export const {} = appSlice.actions;
export default appSlice.reducer;

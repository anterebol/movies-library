import { MovieProps } from '@/types/movieType';
import { getStorageItem, setStorageItem } from '@/utils/localStorage';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getGenres, getMovies, getPosterConfig } from './api/api';
import initialValues from '@/constants/formSortedInitialValues';
import { KeyAsString } from '@/types/KeyAsString';

const emtyGrade = {id: '', user_grade: 0, original_title: ''};
const initialState = {
  user_grades: getStorageItem('user_grades') || {},
  isLoad: true,
  isOpenModal: false,
  currentEstimateItem: {...emtyGrade},
  movies: [] as MovieProps[],
  totalPages: 500,
  genres: [{id: '', name: ''}],
  isNextPage: true,
  isPrevPage: true,
  currentPage: 1,
  searchFormValues: initialValues,
  postersConfig: {images: { poster_sizes: [] }},
};

const appSlice = createSlice({
  name: 'app',
  initialState: { ...initialState },
  reducers: {
    setFormValues: (state, action) => {
      state.searchFormValues = action.payload as KeyAsString;
    },
    openEstimateModal: (state, action) => {
      state.isOpenModal = true;
      state.currentEstimateItem = {...action.payload};
    },
    closeEstimateModal: (state) => {
      state.isOpenModal = false;
      state.currentEstimateItem = {...emtyGrade};
    },
    setCurrentEstimage: (state, action) => {
      const { user_grade } = action.payload;
      const currentEstimate = {...state.currentEstimateItem, user_grade}
      state.currentEstimateItem = currentEstimate;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
      state.isNextPage = false;
      state.isPrevPage = false;
    },
    openNextPage: (state, action) => {
      state.currentPage = action.payload
      state.isNextPage = true;
      state.isPrevPage = false;
    },
    openPrevPage: (state, action) => {
      state.currentPage = action.payload
      state.isNextPage = false;
      state.isPrevPage = true;
    },
    getEstimatedMovies: (state, action) => {
      state.isLoad = true;
      const { page, searchString } = action.payload;
      const firstMovieIndex = (page - 1) * 4;
      const lastMovieIndex = firstMovieIndex + 4;
      const allMovies = Object.values(state.user_grades) as MovieProps[];
      const filteredMovies = allMovies.filter(({original_title}) => original_title.toUpperCase().includes(searchString.toUpperCase()));
      state.movies = filteredMovies.slice(firstMovieIndex, lastMovieIndex);
      state.totalPages = Math.ceil(allMovies.length / 4) || 1;
      state.isLoad = false;
    },
    setUserGrade: (state, action) => {
      const { movie, user_grade, operation } = action.payload;
      const {
        original_title, 
        vote_average, 
        vote_count, 
        release_date, 
        poster_path,
        genre_ids, 
        id 
      } = movie;
      const movieCardProps = { original_title, vote_average, vote_count, release_date, poster_path, id, genre_ids };
      let currentEstimates = {...state.user_grades};
      if (operation === 'removeGrade') {
        delete currentEstimates[movie.id];
      } else {
        currentEstimates[movie.id] = {...movieCardProps, user_grade};
      }
      state.user_grades = {...currentEstimates};
      setStorageItem('user_grades', currentEstimates);
      state.currentEstimateItem = {...emtyGrade};
      state.isOpenModal = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMovies.pending.toString(), (state) => { state.isLoad = true });
    builder.addCase(getMovies.fulfilled.toString(), 
      (state, action: PayloadAction<{ results: MovieProps[], total_pages: number}>) => {
        const { results, total_pages } = action.payload;
        state.movies = results;
        state.totalPages = total_pages <= 500 ? total_pages : 500;
        state.isLoad = false;
    });
    builder.addCase(getMovies.rejected.toString(), (state) => { state.isLoad = false });
    builder.addCase(getGenres.fulfilled.toString(), (state, action: PayloadAction<{id: string, name: string}[]>) => {
      state.genres = action.payload;
    });
    builder.addCase(getPosterConfig.fulfilled.toString(), (state, action: PayloadAction<{images: { poster_sizes: [] }}>) => {
      state.postersConfig = action.payload;
    });
  },
});
export const { openEstimateModal, setUserGrade, closeEstimateModal, setCurrentEstimage, openNextPage, openPrevPage, setCurrentPage, setFormValues, getEstimatedMovies } = appSlice.actions;
export default appSlice.reducer;

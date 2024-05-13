import api from '@/app/API_URL';
import page from '@/app/movies/page';
import { GENRES_PATH, POSTER_CONFIG_PATH, SEARCH_MOVIES_PATH } from '@/constants/apiPathes';
import { GET_GENRES, GET_MOVIES, GET_POSTERS_CONFIG } from '@/constants/thunksName';
import { KeyAsString } from '@/types/KeyAsString';
import { getQueryString } from '@/utils/getQueryString';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getMovies = createAsyncThunk(
  GET_MOVIES,
  async (queryProps: {apiProps: KeyAsString, page: string},{ rejectWithValue }) => {
    const { apiProps, page } = queryProps;
    return api.get(getQueryString(SEARCH_MOVIES_PATH, page, apiProps))
      .then((res) => res.data)
      .catch((rej) => rejectWithValue(rej));
  }
);

export const getGenres = createAsyncThunk(
  GET_GENRES,
  async (_,{ rejectWithValue }) => {
    return api.get(getQueryString(GENRES_PATH))
      .then((res) => res.data.genres)
      .catch((rej) => rejectWithValue(rej));
  }
);

export const getPosterConfig = createAsyncThunk(
  GET_POSTERS_CONFIG,
  async (_,{ rejectWithValue }) => {
    return api.get(getQueryString(POSTER_CONFIG_PATH))
      .then((res) => res.data)
      .catch((rej) => rejectWithValue(rej));
  }
);

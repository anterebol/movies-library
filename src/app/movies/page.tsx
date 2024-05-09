"use client"
import { useEffect, useState } from "react";
import api from '@/app/API_URL'
import { Container } from "@mantine/core";
import { Title } from "../components/Title/Title";
import classes from './movies.module.scss';
import FormSorted from "../components/FormSorted/FormSorted";
import { MovieProps } from "@/types/movieType";
import initialValues from "@/constants/formSortedInitialValues";
import { KeyAsString } from "@/types/KeyAsString";
import { getQueryString } from "@/utils/getQueryString";

const emtyGenres = [{id: '', name: ''}];

export default function Movies() {
  const page = '1';
  const [movies, setMovies] = useState([] as MovieProps[]);
  const [genres, setGenres] = useState(emtyGenres);
  
  const getMovies = (apiProps: KeyAsString) => {
    api.get(getQueryString('search_movies', page, apiProps)).then((res) => {
      const movies = res.data.results as Array<MovieProps>;
      setMovies(movies);
    });
  }
  useEffect(() => {
    api.get('/genres').then((res) => { 
      setGenres(res.data.genres);
    });
    getMovies(initialValues);
  }, []);

  return (
    <Container size={'main-container'}>
      <Title title={"Movies"} className={classes.container__title} tag={"h2"} />
      <FormSorted genres={genres} onChange={getMovies} />
      {movies?.map((movie) => <p key={movie.original_title}>{movie.original_title}</p>)}
    </Container>
  );
}
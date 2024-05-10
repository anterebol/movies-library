"use client"
import { useEffect, useMemo } from "react";
import { Container } from "@mantine/core";
import { Title } from "../components/Title/Title";
import classes from './movies.module.scss';
import FormSorted from "../components/FormSorted/FormSorted";
import initialValues from "@/constants/formSortedInitialValues";
import { KeyAsString } from "@/types/KeyAsString";
import { MovieList } from "../components/MovieList/MovieList";
import { getPosterSize } from "@/utils/getPosterSize";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getGenres, getMovies, getPosterConfig } from "@/store/api/api";

const moviesPosterSize = 119;

export default function Movies() {
  const dispatch = useAppDispatch();
  const { movies, genres, postersConfig } = useAppSelector((state) => state);
  const posterSizes = postersConfig.images.poster_sizes;
  const page = '1';
  
  const get = (apiProps: KeyAsString) => {
    dispatch(getMovies({apiProps, page}));
  }

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getPosterConfig())
    get(initialValues);
  }, []);

  const currentPosterSize = useMemo(() => getPosterSize(posterSizes, moviesPosterSize), [posterSizes])

  return (
    <Container size={'main-container'}>
      <Title title={"Movies"} className={classes.container__title} tag={"h2"} />
      <FormSorted genres={genres} onChange={get} />
      <MovieList user_grades={[{movie_title:"The Idea of You", user_grade: '9'}]} genres={genres} movies={movies} posterSize={currentPosterSize} />
    </Container>
  );
}
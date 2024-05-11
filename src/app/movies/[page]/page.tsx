"use client"
import { useEffect, useMemo } from "react";
import { Container, Modal } from "@mantine/core";
import { Title } from "../../components/Title/Title";
import classes from './movies.module.scss';
import FormSorted from "../../components/FormSorted/FormSorted";
import initialValues from "@/constants/formSortedInitialValues";
import { KeyAsString } from "@/types/KeyAsString";
import { MovieList } from "../../components/MovieList/MovieList";
import { getPosterSize } from "@/utils/getPosterSize";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getGenres, getMovies, getPosterConfig } from "@/store/api/api";

const moviesPosterSize = 119;

export default function Movies({ params }: { params: {page: string}}) {
  const dispatch = useAppDispatch();
  const { movies, genres, postersConfig, user_grades } = useAppSelector((state) => state);
  const { page } = params;
  
  const getMoviesApi = (apiProps: KeyAsString) => {
    dispatch(getMovies({apiProps, page}));
  }

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getPosterConfig())
    getMoviesApi(initialValues);
  }, []);

  const currentPosterSize = useMemo(() => getPosterSize(postersConfig.images.poster_sizes, moviesPosterSize), [postersConfig.images.poster_sizes])

  return (
    <Container size={'main-container'}>
      <Title title={"Movies"} className={classes.container__title} tag={"h2"} />
      <FormSorted genres={genres} onChange={getMoviesApi} />
      <MovieList user_grades={user_grades} genres={genres} movies={movies} posterSize={currentPosterSize} />
    </Container>
  );
}
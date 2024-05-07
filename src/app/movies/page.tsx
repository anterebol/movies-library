"use client"
import { useEffect, useState } from "react";
import api from '@/app/API_URL'
import { Container } from "@mantine/core";
import { Title } from "../components/Title/Title";
import classes from './movies.module.scss';
import FormSorted from "../components/FormSorted/FormSorted";
const emtyGenres = [{id: '', name: ''}]
export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState(emtyGenres);
  useEffect(() => {
    api.get('/genres').then((res) => { 
      setGenres(res.data.genres);
    });
    api.get('/search_movies/&sort_by=popularity.desc&page=3').then((res) => console.log(res.data));
  }, []);
  const searchMovies = (apiProps: any) => {

  }
  return (
    <Container className={classes.container}>
      <Title title={"Movies"} className={classes.container__title} tag={"h2"} />
      <FormSorted genres={genres} onChange={(props: any) => {
        searchMovies(props);
      }} />
    </Container>
  );
}
"use client"
import { useEffect } from "react";
import { Title } from "../components/Title/Title";
import classes from './movies.module.scss';
import FormSorted from "../components/FormSorted/FormSorted";
import { KeyAsString } from "@/types/KeyAsString";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getMovies} from "@/store/api/api";
import { useSearchParams } from 'next/navigation';
import MoviesPageLayout from "../components/MoviesPageLayout/MoviesPageLayout";

export default function Movies() {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams()
  const page = searchParams.get('page') || '1';
  const { totalPages, genres, searchFormValues } = useAppSelector((state) => state);
  
  const getMoviesApi = (apiProps: KeyAsString) => {
    dispatch(getMovies({apiProps, page}));
  }

  useEffect(() => {
    getMoviesApi(searchFormValues);
  }, [totalPages, page]);

  return (
    <MoviesPageLayout link={"movies"}>
      <Title 
        title={"Movies"} 
        className={classes.container__title} 
        tag={"h2"} 
      />
      <FormSorted genres={genres} onChange={getMoviesApi} />
    </MoviesPageLayout>
  );
}
"use client"
import { useEffect, useState } from "react";
import { Title } from "../components/Title/Title";
import classes from './movies.module.scss';
import FormSorted from "../components/FormSorted/FormSorted";
import { KeyAsString } from "@/types/KeyAsString";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getMovies} from "@/store/api/api";
import { useSearchParams } from 'next/navigation';
import MoviesPageLayout from "../components/MoviesPageLayout/MoviesPageLayout";
import { setFormValues } from "@/store/appReducer";

export default function Movies() {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const [isValid, setIsValid] = useState(true);
  const page = searchParams.get('page') || '1';
  const { genres, searchFormValues } = useAppSelector((state) => state);
  
  const getMoviesApi = (apiProps: KeyAsString, page: string) => {
    isValid && dispatch(getMovies({apiProps, page: page}));
  }
  const setForm = (formState: KeyAsString, isValid: boolean) => {
    dispatch(setFormValues(formState));
    setIsValid(isValid);
  }

  useEffect(() => {
    getMoviesApi(searchFormValues, page);
  }, []);

  useEffect(() => {
    getMoviesApi(searchFormValues, page);
  }, [page, searchFormValues]);

  return (
    <MoviesPageLayout page={page} link={"movies"}>
      <Title 
        title={"Movies"} 
        className={classes.container__title} 
        tag={"h2"} 
      />
      <FormSorted genres={genres} onChange={setForm} />
    </MoviesPageLayout>
  );
}
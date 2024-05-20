"use client"
import { Suspense, useEffect, useState } from "react";
import classes from './movies.module.scss';
import FormSorted from "../components/FormSorted/FormSorted";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getMovies} from "@/store/api/api";
import { useSearchParams } from 'next/navigation';
import MoviesPageLayout from "../components/MoviesPageLayout/MoviesPageLayout";
import { setFormValues } from "@/store/appReducer";
import { Flex, Title } from "@mantine/core";
import { SortType } from "@/constants/formSortedInitialValues";
import { SearchEmptyState } from "../components/EmptyState/SearchEmptyState/SearchEmptyState";

function Movies() {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const [isValid, setIsValid] = useState(true);
  const page = searchParams.get('page') || '1';
  const { genres, searchFormValues, isLoad, movies } = useAppSelector((state) => state);
  
  const getMoviesApi = (apiProps: SortType, page: string) => {
    isValid && dispatch(getMovies({apiProps, page: page}));
  }
  const setForm = (formState: SortType, isValid: boolean) => {
    dispatch(setFormValues(formState));
    setIsValid(isValid);
  }

  useEffect(() => {
    getMoviesApi(searchFormValues, page);
  }, [searchFormValues, page]);

  return (
    <MoviesPageLayout page={page} link={"movies"}>
      <Flex classNames={{ root: classes.movies__header }}>
        <Title 
          size={'mt'}
          title={"Movies"} 
          className={classes.container__title} 
        >
          Movies
        </Title>
        <FormSorted genres={genres} onChange={setForm} />
      </Flex>
      {!isLoad && !movies.length && <SearchEmptyState />}
    </MoviesPageLayout>
  );
}

export default function Suspence () {
  return (
    <Suspense>
      <Movies />
    </Suspense>
  )
}
"use client"
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import MoviesPageLayout from "../components/MoviesPageLayout/MoviesPageLayout";
import { getEstimatedMovies } from "@/store/appReducer";
import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Flex, Title } from "@mantine/core";
import { SearchRatedMovies } from "../components/SearchRatedMovies/SearchRatedMovies";
import classes from './rated_movies.module.scss';
import { SearchEmptyState } from "../components/EmptyState/SearchEmptyState/SearchEmptyState";
import { RatedEmptyState } from "../components/EmptyState/RatedEmptyState/RatedEmptyState";

function RatedMovies() {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const page = searchParams.get('page') || '1';
  const { user_grades, searchTitle, isLoad, movies } = useAppSelector((state) => state);
  const isRatedMovies = !!Object.values(user_grades).length;

  const getMoviesLocalStorage = (searchString = searchTitle) => {
    dispatch(getEstimatedMovies({searchString, page: Number(page)}))
  }

  useEffect(() => {
    getMoviesLocalStorage();
  }, [user_grades, page]);

  return (
    <MoviesPageLayout page={page} link={"rated_movies"}>
      {(isLoad || isRatedMovies) ? 
        <Flex classNames={{root: classes.rated__header}}>
          <Title size={'mt'} title={"Rated movies"}>
            Rated movies
          </Title>
          <SearchRatedMovies onSearch={getMoviesLocalStorage} defaultValue={searchTitle} />
        </Flex> : <RatedEmptyState />
      }
      {isRatedMovies && !isLoad && !movies.length && 
        <Flex 
          h={'80%'} 
          align={'center'} 
          justify={'center'}
        >
          <SearchEmptyState />
        </Flex>
      }
    </MoviesPageLayout>
  )
}

export default function Suspence () {
  return (
    <Suspense>
      <RatedMovies />
    </Suspense>
  )
}
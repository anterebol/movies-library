"use client"
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import MoviesPageLayout from "../components/MoviesPageLayout/MoviesPageLayout";
import { Title } from "../components/Title/Title";
import { getEstimatedMovies } from "@/store/appReducer";
import { FormEventHandler, Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button, TextInput } from "@mantine/core";
import searchIcon from '@/assets/search.svg';
import Image from "next/image";
import classes from './rated_movies.module.scss';

function RatedMovies() {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const page = searchParams.get('page') || '1';
  const { user_grades, searchTitle } = useAppSelector((state) => state);
  const [searchString, setSearchString] = useState(searchTitle);

  const getMoviesLocalStorage = () => {
    dispatch(getEstimatedMovies({searchString, page: Number(page)}))
  }

  useEffect(() => {
    getMoviesLocalStorage();
  }, [user_grades, page]);

  return (
    <MoviesPageLayout page={page} link={"rated_movies"}>
      <Title title={"Rated movies"} tag={"h2"} />
      <TextInput
        classNames={{
          root: classes.search,
          wrapper: classes.search__wrapper,
          input: classes.search__input,
        }}
        value={searchString}
        type="text"
        onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
          setSearchString(e.target.value);
        }}
        leftSectionPointerEvents="none"
        leftSection={
          <Image 
            width={16} 
            height={16} 
            src={searchIcon} 
            alt="search_icon" 
          />
        }
        rightSection={
          <Button  
            className={classes.search__button}
            title="Saerch"
            onClick={getMoviesLocalStorage}
          >
            Search
          </Button>
        }
        rightSectionWidth={100}
        placeholder="Search movie title"
      />
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
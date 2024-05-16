"use client"
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import MoviesPageLayout from "../components/MoviesPageLayout/MoviesPageLayout";
import { Title } from "../components/Title/Title";
import { getEstimatedMovies } from "@/store/appReducer";
import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { TextInput } from "@mantine/core";

function RatedMovies() {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams()
  const page = searchParams.get('page') || '1';
  const { user_grades } = useAppSelector((state) => state);

  const getMoviesLocalStorage = (searchString = '') => {
    dispatch(getEstimatedMovies({searchString, page: Number(page)}))
  }

  useEffect(() => {
    getMoviesLocalStorage();
  }, [user_grades, page]);

  return (
    <MoviesPageLayout page={page} link={"rated_movies"}>
      <Title title={"Rated movies"} tag={"h2"} />
      <TextInput
        leftSectionPointerEvents="none"
        leftSection={icon}
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
"use client"
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import MoviesPageLayout from "../components/MoviesPageLayout/MoviesPageLayout";
import { Title } from "../components/Title/Title";
import { getEstimatedMovies } from "@/store/appReducer";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function RatedMovies() {
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
      <Title title={"Rated movies"} className={''} tag={"h2"} />
    </MoviesPageLayout>
  )
}
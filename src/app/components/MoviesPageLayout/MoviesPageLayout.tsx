"use client"
import { ReactNode, useEffect } from "react";
import { Container } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getGenres, getPosterConfig } from "@/store/api/api";
import { CustomPagination } from "@/app/components/CustomPagination/CustomPagination";
import { useRouter } from 'next/navigation';
import { MovieList } from "../MovieList/MovieList";
import { getPageLink } from "@/utils/getPageLink";
import { Preloader } from "../Preloader/Preloader";
import { HideBox } from "../HideBox/HideBox";
import { GeneralLayout } from "../GeneralLayout/GeneralLayout";

export default function MoviesPageLayout (props: { children: ReactNode, link: string, page: string}) {
  const { children, link, page } = props;
  const dispatch = useAppDispatch();
  const { isLoad, totalPages, movies, user_grades } = useAppSelector((state) => state);
  const router = useRouter();
  const isMoviesPage = link === 'movies';
  const isRatedMovies = !!Object.values(user_grades).length;

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getPosterConfig());
  }, []);

  useEffect(() => {
    if (Number(page) > totalPages) {
      router.push(getPageLink(link, totalPages));
    } else if (Number(page) < 1) {
      router.push(getPageLink(link, 1));
    }
  }, [totalPages, page]);

  return (
    <GeneralLayout>
      <Container size={'main-container'}>
        {children}
        {isLoad ? <Preloader /> : <MovieList />}
        <HideBox isShow={isMoviesPage ? (isLoad || !!movies.length) : (isRatedMovies && !!movies.length)} >
          <CustomPagination
            page={Number(page)} 
            link={link} 
            position={isMoviesPage ? 'flex-end' : 'center'} 
          />
        </HideBox>
      </Container>
    </GeneralLayout>
  );
}
"use client"
import { ReactNode, useEffect } from "react";
import { Container, Flex } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getGenres, getPosterConfig } from "@/store/api/api";
import { CustomPagination } from "@/app/components/CustomPagination/CustomPagination";
import { useRouter } from 'next/navigation';
import { openPrevPage } from "@/store/appReducer";
import { MovieList } from "../MovieList/MovieList";
import { getPageLink } from "@/utils/getPageLink";
import { RatedEmptyState } from "../EmptyState/RatedEmptyState/RatedEmptyState";
import { SearchEmptyState } from "../EmptyState/SearchEmptyState/SearchEmptyState";
import { Preloader } from "../Preloader/Preloader";
import { HideBox } from "../HideBox/HideBox";

export default function MoviesPageLayout (props: { children: ReactNode, link: string, page: string}) {
  const { children, link, page } = props;
  const dispatch = useAppDispatch();
  const { isLoad, totalPages, movies } = useAppSelector((state) => state);
  const router = useRouter();
  const isMoviesPage = link === 'movies';
  const currentEmptyState = isMoviesPage ? <SearchEmptyState /> : <RatedEmptyState />;

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getPosterConfig());
  }, []);

  useEffect(() => {
    if (Number(page) > totalPages) {
      router.push(getPageLink(link, totalPages));
      dispatch(openPrevPage(totalPages));
    } else if (Number(page) < 1) {
      router.push(getPageLink(link, 1));
      dispatch(openPrevPage(1));
    }
  }, [totalPages, page]);

  return (
    <Container size={'main-container'}>
      <Flex direction={isMoviesPage ? 'column': 'row'}>
        <HideBox isShow={isMoviesPage}>
          {children}
          {!isLoad && !movies.length && currentEmptyState}
        </HideBox>
        <HideBox isShow={!isMoviesPage}>
          {isLoad || movies.length ? children : movies.length && currentEmptyState}
        </HideBox>
      </Flex>
      {isLoad ? <Preloader /> : <MovieList />}
      <HideBox isShow={(isLoad || !!movies.length)} >
        <CustomPagination
          page={Number(page)} 
          link={link} 
          position={isMoviesPage ? 'flex-end' : 'center'} 
        />
      </HideBox>
    </Container>
  );
}
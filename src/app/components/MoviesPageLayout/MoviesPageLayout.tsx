"use client"
import { useEffect } from "react";
import { Container, Flex, Loader } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getGenres, getPosterConfig } from "@/store/api/api";
import { CustomPagination } from "@/app/components/CustomPagination/CustomPagination";
import { useRouter } from 'next/navigation';
import { openPrevPage } from "@/store/appReducer";
import { MovieList } from "../MovieList/MovieList";
import { getPageLink } from "@/utils/getPageLink";
import { RatedEmptyState } from "../EmptyState/RatedEmptyState/RatedEmptyState";
import { SearchEmptyState } from "../EmptyState/SearchEmptyState/SearchEmptyState";

export default function MoviesPageLayout (props: { children: React.ReactNode, link: string, page: string}) {
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
        {isMoviesPage ? <>{children} {!isLoad && !movies.length && currentEmptyState}</> : isLoad ? <>{children}</> : !movies.length && currentEmptyState}
      </Flex>
      {isLoad ? 
        <Flex 
          h={'inherit'} 
          w={'100%'} 
          justify={'center'} 
          align={'center'}
        >
          <Loader color="grape" />
        </Flex> : 
        <MovieList />
      }
      {(isLoad || !!movies.length) && <CustomPagination 
        page={Number(page)} 
        link={link} 
        position={isMoviesPage ? 'flex-end' : 'center'} 
      />}
    </Container>
  );
}
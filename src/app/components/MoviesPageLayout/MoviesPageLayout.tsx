"use client"
import { useEffect } from "react";
import { Container, Flex, Loader } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getGenres, getPosterConfig } from "@/store/api/api";
import { CustomPagination } from "@/app/components/CustomPagination/CustomPagination";
import { useRouter, useSearchParams } from 'next/navigation';
import { openPrevPage } from "@/store/appReducer";
import { MovieList } from "../MovieList/MovieList";

export default function MoviesPageLayout (props: { children: React.ReactNode, link: string, page: string}) {
  const { children, link, page } = props;
  const dispatch = useAppDispatch();
  const { isLoad, totalPages } = useAppSelector((state) => state);
  const router = useRouter();

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getPosterConfig());
  }, []);

  useEffect(() => {
    if (Number(page) > totalPages) {
      router.push(`/${link}?page=${totalPages}`);
      dispatch(openPrevPage(totalPages));
    } else if (Number(page) < 1) {
      router.push(`/${link}?page=${1}`);
      dispatch(openPrevPage(1));
    }
  }, [totalPages, page]);

  return (
    <Container size={'main-container'}>
      <Flex direction={link === 'movies' ? 'column': 'row'}>
        {children}
      </Flex>
      {isLoad ? 
        <Flex h={'inherit'} w={'100%'} justify={'center'} align={'center'}>
          <Loader color="grape" />
        </Flex> : 
        <MovieList />
      }
      <CustomPagination page={Number(page)} link={link} />
    </Container>
  );
}
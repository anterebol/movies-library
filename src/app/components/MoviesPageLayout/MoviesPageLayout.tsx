"use client"
import { useEffect } from "react";
import { Container, Flex, Loader } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getGenres, getPosterConfig } from "@/store/api/api";
import { CustomPagination } from "@/app/components/CustomPagination/CustomPagination";
import { useRouter, useSearchParams } from 'next/navigation';
import { openPrevPage } from "@/store/appReducer";
import { MovieList } from "../MovieList/MovieList";

export default function MoviesPageLayout (props: { children: React.ReactNode, link: string}) {
  const { children, link } = props;
  const dispatch = useAppDispatch();
  const { isLoad } = useAppSelector((state) => state);
  const router = useRouter();
  const searchParams = useSearchParams()
  const page = searchParams.get('page') || '1';
  const { totalPages } = useAppSelector((state) => state);

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getPosterConfig());
  }, []);

  useEffect(() => {
    if (Number(page) > totalPages) {
      router.push(`/${link}?page=${totalPages}`);
      dispatch(openPrevPage(totalPages));
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
        <MovieList link={link} />
      }
      <CustomPagination page={Number(page)} link={link} />
    </Container>
  );
}
'use client'
import { GeneralLayout } from "@/app/components/GeneralLayout/GeneralLayout";
import { MovieAdditionalInfo } from "@/app/components/MovieAdditionalInfo/MovieAdditionalInfo";
import { MovieCard } from "@/app/components/MovieList/MovieCard/MovieCard";
import { Preloader } from "@/app/components/Preloader/Preloader";
import { Title } from "@/app/components/Title/Title";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getMovie, getPosterConfig, getTrailer } from "@/store/api/api";
import { MovieProps } from "@/types/movieType";
import { getPosterSize } from "@/utils/getPosterSize";
import { Box, Container, Flex } from "@mantine/core";
import { useEffect, useMemo, useState } from "react";
import classes from './movie.module.scss';

const moviesPosterSize = 250;
const logoWidth = 40;

export default function MoviePage({ params }: { params: {id: string} }) {
  const {id} = params;
  const [movie, setMovie] = useState({} as MovieProps);
  const [isLoad, setIsLoad] = useState(true);
  const [trailerKey, setTrailerKey] = useState('');
  const dispatch = useAppDispatch();
  const {postersConfig, user_grades} = useAppSelector((state) => state);

  const getMovieById = () => {
    setIsLoad(true);
    dispatch(getMovie(id))
      .then((res) => {
        setMovie(res.payload);
        dispatch(getTrailer(res.payload.id))
          .then((res) => 
            setTrailerKey(res.payload?.results[0]?.key))
    }).finally(() => setIsLoad(false));
  }

  useEffect(() => {
    dispatch(getPosterConfig());
    getMovieById();
  }, []);

  const posterSize = useMemo(() => getPosterSize(postersConfig.images.poster_sizes, moviesPosterSize), [postersConfig]);

  const logoSize = useMemo(() => getPosterSize(postersConfig.images.poster_sizes, logoWidth), [postersConfig])

  return (
    <GeneralLayout>
      <Container size={'card-container'}>
        <Box className={classes.movie__box}>
          {isLoad ? <Preloader /> : 
            <>
              <Box className={classes.movie__title}>
                <Title title={'Movies'} tag="h2" />
                <h2 style={{color: "black"}}>/</h2>
                <Title title={movie.original_title} tag="h2" />
              </Box>
              <MovieCard 
                isFullCard={true} 
                movie={movie} 
                posterSize={posterSize} 
                allGenres={[]} 
                user_grade={user_grades[id]?.user_grade || 0} 
              />
              <MovieAdditionalInfo 
                trailerKey={trailerKey} 
                movieDescription={movie.overview} 
                productionCompanys={movie.production_companies || []} 
                logoSize={logoSize}
              />
            </>
          }
        </Box>
      </Container>
    </GeneralLayout>
  )
}
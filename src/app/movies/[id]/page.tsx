'use client'
import { MovieAdditionalInfo } from "@/app/components/MovieAdditionalInfo/MovieAdditionalInfo";
import { MovieCard } from "@/app/components/MovieList/MovieCard/MovieCard";
import { Preloader } from "@/app/components/Preloader/Preloader";
import { Title } from "@/app/components/Title/Title";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getMovie, getPosterConfig, getTrailer } from "@/store/api/api";
import { MovieProps } from "@/types/movieType";
import { getPosterSize } from "@/utils/getPosterSize";
import { Container, Flex } from "@mantine/core";
import { useEffect, useMemo, useState } from "react";

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
            setTrailerKey(res.payload?.results[1]?.key))
    }).finally(() => setIsLoad(false));
  }

  useEffect(() => {
    dispatch(getPosterConfig());
    getMovieById()
  }, []);

  const posterSize = useMemo(() => getPosterSize(postersConfig.images.poster_sizes, moviesPosterSize), [postersConfig]);

  const logoSize = useMemo(() => getPosterSize(postersConfig.images.poster_sizes, logoWidth), [postersConfig])

  return (
    <Container size={'card-container'}>
      <Flex 
        direction={'column'} 
        gap={20} 
        h={'inherit'} 
        justify={'center'}
      >
        {isLoad ? <Preloader /> : 
          <>
            <Flex gap={10} align={'center'}>
              <Title title={'Movies'} tag="h2" />
              <p>/</p>
              <Title title={movie.original_title} tag="h2" />
            </Flex>
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
      </Flex>
    </Container>
  )
}
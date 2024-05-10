import { MovieProps } from "@/types/movieType"
import { Box, Card, Flex, Group, List, Rating } from "@mantine/core";
import { Image } from '@mantine/core';
import classes from './movieCard.module.scss';
import { Title } from "../../Title/Title";
import { Text } from "../../Text/Text";
import { getYear } from "@/utils/getYear";
import { useMemo } from "react";
import { GenreProps } from "../MovieList";

export const MovieCard = ({ movie, posterSize, genres, user_grade }: { movie: MovieProps, posterSize: string, genres: Array<GenreProps>, user_grade: string | undefined }) => {
  const { 
    original_title, 
    poster_path, 
    release_date, 
    vote_average,
    vote_count,
    genre_ids
  } = movie;
  const genresList = useMemo(() => 
    genres.filter((genre) => 
      genre_ids.find((genreId) => 
        genre.id === genreId)).map(({name}) => 
          name).join(', '),
  [genre_ids, genres]);
  const releaseYear = useMemo(() => getYear(release_date), [release_date]);

  return <Card className={classes.card__movie} padding={24}>
      <Group className={classes.card__movie__rating__button}>
        <Rating 
          onClick={() => console.log('x')} 
          color="violet" 
          size={"lg"} 
          count={1} 
          defaultValue={user_grade ? 1 : 0} 
          readOnly
        />
        {user_grade && <Text className={classes.card__movie__rating__button__grade} text={user_grade}/>}
      </Group>
    <Image 
      w={119} 
      h={170} 
      src={`https://image.tmdb.org/t/p/${posterSize}${poster_path}`} 
      alt={`${original_title}_poster`} 
    />
    <Box className={classes.card__movie__info}>
      <Flex direction={"column"} gap={8} align={'flex-start'}>
      <Title 
        title={original_title} 
        tag={'h3'} 
        className={classes.card__movie__title}
      />
      <Text className={classes.card__movie__year} text={releaseYear} />
      <Box className={classes.card__movie__rating}>
        <Rating 
          size={"lg"} 
          count={1} 
          defaultValue={1} 
          readOnly
        />
        <Text className={classes.card__movie__rating__grade} text={`${vote_average}`} />
        <Text className={classes.card__movie__rating__votes} text={`(${vote_count})`} />
      </Box>
      </Flex>
      <Group className={classes.card__movie__genres}>
        <Text className="" text="Genre:" />
        <Text className={classes.card__movie__genres__list} text={genresList} />
      </Group>
    </Box>
  </Card>
}
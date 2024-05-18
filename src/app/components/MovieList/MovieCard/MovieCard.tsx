import { Box, Card, Flex, Group, Rating, Image } from "@mantine/core";
import classes from './movieCard.module.scss';
import { Title } from "../../Title/Title";
import { Text } from "../../Text/Text";
import { getYear } from "@/utils/getYear";
import { useEffect, useMemo, useState, } from "react";
import { useAppDispatch } from "@/hooks/hooks";
import { openEstimateModal } from "@/store/appReducer";
import { FlexItem } from "../../FlexItem/FlexItem";
import { setRunTime } from "@/utils/setRunTime";
import { setStringDate } from "@/utils/setStringDate";
import { setMoney } from "@/utils/setMoney";
import { NonePoster } from "../../NonePoster/NonePoster";
import { MovieCardProps } from "@/types/movieCardProps";
import { GenreType } from "@/types/genreType";
import { Preloader } from "../../Preloader/Preloader";

export const MovieCard = (props: MovieCardProps) => {
  const { movie, posterSize, allGenres, user_grade, isFullCard } = props
  const { 
    original_title, 
    poster_path, 
    release_date, 
    vote_average,
    vote_count,
    genre_ids,
    revenue,
    budget,
    genres,
    runtime,
  } = movie;

  const dispatch = useAppDispatch();
  const [isLoad, setIsLoad] = useState(!!poster_path);

  useEffect(() => {
    const img = document.createElement('img');
    img.setAttribute('src', `https://image.tmdb.org/t/p/${posterSize}${poster_path}`);
    img.onload = () => setIsLoad(false);
  }, [poster_path, posterSize])

  const setMovieGrade = (e: {stopPropagation: () => void}) => {
    e.stopPropagation();
    dispatch(openEstimateModal({...movie, user_grade}));
  };

  const cardHeight = isFullCard ? 400 : 218;
  const cardWidth = isFullCard ? '100%' : 482;
  const posterSizes = {height: isFullCard ? 352 : 170, width: isFullCard ? 250 : 119};

  const genresList = useMemo(() => {
    let currentGenreList = [] as Array<GenreType>;
    if (genres?.length) {
      currentGenreList = genres;
    } else if (allGenres?.length && genre_ids?.length) {
      currentGenreList = allGenres.filter((genre) => 
        genre_ids?.find((genreId) => 
          genre.id === genreId));
    }
    return currentGenreList?.length ? 
      currentGenreList.map(({name}) => name).join(', ') : 
      '-/-';
  }, [genre_ids, genres, allGenres]);
  
  const releaseYear = useMemo(() => getYear(release_date), [release_date]);

  return (
    <Card h={cardHeight} className={classes.card__movie} w={cardWidth} padding={24}>
      <Group className={classes.card__movie__rating__button}>
        <Rating 
          onClick={(e) => {setMovieGrade(e)}} 
          color="violet" 
          size={"lg"} 
          count={1}
          value={user_grade ? 1 : 0}
        />
        {user_grade && <Text className={classes.card__movie__rating__button__grade} text={user_grade}/>}
      </Group>
      <Box w={posterSizes.width} h={posterSizes.height} >
        {isLoad ? 
          <Preloader /> : 
          poster_path ? 
            <Image 
              w={posterSizes.width} 
              h={posterSizes.height} 
              src={`https://image.tmdb.org/t/p/${posterSize}${poster_path}`} 
              alt={`${original_title}_poster`} 
            /> : 
            <NonePoster width={posterSizes.width} height={posterSizes.height} />
        }
      </Box>
      <Box className={classes.card__movie__info}>
        <Flex 
          direction={"column"} 
          gap={8} 
          align={'flex-start'}
        >
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
            <Text className={classes.card__movie__rating__grade} text={vote_average} />
            <Text className={classes.card__movie__rating__votes} text={`(${vote_count})`} />
          </Box>
        </Flex>
        <Flex direction={'column'} gap={12}>
          {isFullCard ?
            <>
              <FlexItem title={"Duration"} description={setRunTime(runtime || 0)} />
              <FlexItem title={"Premiere"} description={setStringDate(release_date)} />
              <FlexItem title={"Budget"} description={setMoney(budget)} />
              <FlexItem title={"Gross worldwide"} description={setMoney(revenue)} />
              <FlexItem title={"Genres"} description={genresList} />
            </> : 
            <Flex gap={8} align={'baseline'}>
              <Text text="Genres" />
              <Text className={classes.card__movie__description} text={genresList} />
            </Flex>
          }
        </Flex>
      </Box>
    </Card>
  )
}
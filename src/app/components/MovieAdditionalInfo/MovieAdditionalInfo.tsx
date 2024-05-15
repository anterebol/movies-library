import { Box, Card, Flex } from "@mantine/core";
import { Title } from "../Title/Title";
import classes from './movieAdditionalInfo.module.scss';
import YouTube from "react-youtube";
import { Text } from "../Text/Text";
import { MovieAdditionalInfoProps } from "@/types/movieAdditionalProps";

export const MovieAdditionalInfo = (props: MovieAdditionalInfoProps) => {
  const {trailerKey, movieDescription, productionCompanys, logoSize} = props;

  return (
    <Card 
      padding={24} 
      radius={12} 
      className={classes.additional__info} 
      w={'100%'}
    >
      <Flex direction={'column'} gap={20} >
        <Flex direction={'column'} gap={16} >
          <Title 
            className={classes.additional__info__title} 
            title={'Trailer'} 
            tag="h3" 
          />
          <YouTube videoId={trailerKey} className={classes.additional__info__trailer} />
        </Flex>
        <Flex 
          direction={'column'} 
          gap={16} 
          className={classes.additional__info__description}
        >
          <Title 
            className={classes.additional__info__title} 
            title={'Description'} 
            tag="h3"
          />
          <Text text={movieDescription} />
        </Flex>
        <Flex 
          direction={'column'} 
          align={'start'} 
          gap={16}
        >
          <Title 
            className={classes.additional__info__title} 
            title={'Production'} 
            tag="h3" 
          />
          {productionCompanys.map(({name, logo_path}) => 
            <Flex 
              key={name + logo_path} 
              align={'center'} 
              gap={8}
              h={40}
            >
              <Box className={classes.additional__info__logo}>
                <Box 
                  className={classes.additional__info__logo__img} 
                  bg={`url(https://image.tmdb.org/t/p/${logoSize}${logo_path}) center center / contain no-repeat`} 
                />
              </Box>
              <Text className={classes.additional__info__logo__text} text={name} />
            </Flex>
          )}
        </Flex>
      </Flex>
    </Card>
  )
}
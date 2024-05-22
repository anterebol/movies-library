import { Box, Card, Flex } from "@mantine/core";
import { Title } from "../Title/Title";
import classes from './movieAdditionalInfo.module.scss';
import YouTube from "react-youtube";
import { Text } from "../Text/Text";
import { MovieAdditionalInfoProps } from "@/types/movieAdditionalProps";
import noneVideo from '@/assets/none-video.svg';
import Image from "next/image";
import { ProductionCompany } from "./ProductionCompany/ProductionCompany";

export const MovieAdditionalInfo = (props: MovieAdditionalInfoProps) => {
  const {trailerKey, movieDescription, productionCompanys, logoSize} = props;

  return (
    <Card 
      padding={24} 
      radius={12} 
      className={classes.additional__info} 
    >
      <Flex direction={'column'} gap={20} >
        <Flex direction={'column'} gap={16} >
          <Title 
            className={classes.additional__info__title} 
            title={'Trailer'} 
            tag="h3" 
          />
          <Box className={classes.additional__info__trailer}>
            {trailerKey ? 
              <YouTube videoId={trailerKey} /> :
              <Image 
                width={50} 
                height={50} 
                alt="none_video" 
                src={noneVideo} 
              />
            }
          </Box>
        </Flex>
        {movieDescription && <Flex 
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
        </Flex>}
        {!!productionCompanys.length &&
        <Flex 
        direction={'column'} 
        align={'start'} 
        gap={16}>
        <Title 
          className={classes.additional__info__title} 
          title={'Production'} 
          tag="h3" 
        />
        {productionCompanys.map(({name, logo_path}) => (
          <ProductionCompany 
            key={name + logo_path}
            logoSize={logoSize} 
            name={name} 
            logo_path={logo_path} 
          />)
        )}
      </Flex>
          
        }
      </Flex>
    </Card>
  )
}
import { Flex, Box } from "@mantine/core";
import Image from 'next/image';
import { Text } from "../Text/Text";
import classes from './nonePoster.module.scss';
import nonePoster from '@/assets/nonePoster.svg';

export const NonePoster = ({width, height}: {width: number, height: number}) => {
  return <Box w={width} h={height} className={classes.none__poster}>
    <Image 
      width={24}
      height={24} 
      style={{ margin: '4px 0'}}
      src={nonePoster} 
      alt={`none_poster`} 
    />
    <Text className={classes.none__poster__text} text={"No Poster"} />
  </Box>
}
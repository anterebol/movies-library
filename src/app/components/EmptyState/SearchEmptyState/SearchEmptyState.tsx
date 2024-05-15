import { Box } from "@mantine/core";
import { Text } from "../../Text/Text";
import Image from "next/image";
import emptyState from '@/assets/emptyState/nothing_state.svg';
import classes from './emptyState.module.scss';

export const SearchEmptyState = () => {
  return (
    <Box className={classes.empty__state}>
      <Image width={310} height={252} alt="empty_state" src={emptyState} />
      <Text 
        className={classes.empty__state__text} 
        text={`We don't have such movies, look for another one`}  
      />
    </Box>
  )
}
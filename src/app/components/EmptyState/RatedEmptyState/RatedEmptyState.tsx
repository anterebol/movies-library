'use client'
import { Box, Button } from "@mantine/core";
import { Text } from "../../Text/Text";
import Image from "next/image";
import emptyState from '@/assets/emptyState/empty_rated.svg';
import classes from './emptyState.module.scss';
import { useRouter } from "next/navigation";

export const RatedEmptyState = () => {
  const router = useRouter();

  return (
    <Box className={classes.empty__state}>
      <Image width={400} height={300} alt="empty_state" src={emptyState} />
      <Text 
        className={classes.empty__state__text} 
        text={`You haven't rated any films yet`}  
      />
      <Button className={classes.empty__state__button} onClick={() => {
        router.push(`/movies?page=1`)
      }}>
        Find movies
      </Button>
    </Box>
  )
}
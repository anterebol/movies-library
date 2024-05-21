import { Box, Flex } from "@mantine/core";
import { Text } from "../../Text/Text";
import classes from './production.module.scss';
import { useEffect, useState } from "react";
import { ProductionProps } from "@/types/ProductionProps";
import { GET_POSTER_PATH } from "@/constants/apiPathes";
import { getPoster } from "@/store/api/api";

export const ProductionCompany = (props: ProductionProps) => {
  const { name, logo_path, logoSize } = props;
  const [logo, setLogo] = useState('');

  useEffect(() => {
    if (logo_path) {
      const url = GET_POSTER_PATH + logoSize + logo_path;
    
      getPoster(url).then((src) => {
        setLogo(src);
      });
    }
  }, [logo_path, logoSize]);

  return (
    <Flex 
      align={'center'} 
      gap={8}
      h={40}
    >
      {!!logo && 
        <Box className={classes.logo}>
          <Box 
            className={classes.logo__img} 
            bg={`url(${logo}) 
            center center / contain no-repeat`} 
          />
        </Box>
      }
      <Text className={classes.logo__text} text={name} />
    </Flex>
  )
}
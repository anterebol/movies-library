'use client'
import { createTheme, Container } from "@mantine/core";
import cx from 'clsx';
import classes from './theme.module.scss';

export const theme = createTheme({
  components: {
    Container: Container.extend({
      classNames: (_, { size }) => ({
        root: cx({  
                    [classes.container]: true,
                    [classes.responsiveMainContainer]: size === 'main-container',  
                    [classes.responsiveCardContainer]: size === 'card-container'
                  }),
      }),
    }),
  },
});
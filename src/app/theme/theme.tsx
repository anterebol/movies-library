'use client'
import { createTheme, Container, Button, Title, OptionsDropdown, Select, Combobox, InputBase, ComboboxOption, ComboboxOptions, PillsInput, Pill } from "@mantine/core";
import cx from 'clsx';
import classes from './theme.module.scss';

export const theme = createTheme({
  components: {
    Button: Button.extend({
      classNames: (_, { size }) => ({
        root: cx({ 
          [classes.violet__button]: size === 'vb', 
          [classes.button__none]: size === 'btnNone', 
        }),
      }),
    }),
    Title: Title.extend({
      classNames: (_, { size }) => ({
        root: cx({ [classes.main__title]: size === 'mt' }),
      }),
    }),
    InputBase: InputBase.extend({
      classNames: (_, { size }) => ({
        root: cx({ [classes.select]: size === 'customInput' }),
        wrapper: cx({ [classes.select__wrapper]: size === 'customInput' }),
        input: cx({ 
          [classes.select__input]: 'customInput',
          [classes.select__input__selected]: size === 'customInput' 
        }),
        label: cx({ [classes.select__label]: size === 'customInput' }),
      }),
    }),
    PillsInput: PillsInput.extend({
      classNames: (_, { size }) => ({
        root: cx({ [classes.select]: size === 'customInput' }),
        wrapper: cx({ [classes.select__wrapper]: size === 'customInput' }),
        input: cx({ 
          [classes.select__input]: size === 'customInput',
          [classes.select__input__selected]: size === 'customInput' 
        }),
        label: cx({ [classes.select__label]: size === 'customInput' }),
      }),
    }),
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
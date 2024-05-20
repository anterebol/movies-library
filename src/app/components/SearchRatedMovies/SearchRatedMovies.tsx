import { TextInput, Button } from "@mantine/core";
import Image from "next/image";
import classes from './searchRatedMovies.module.scss';
import { useState } from "react";
import searchIcon from '@/assets/search.svg';

export const SearchRatedMovies = (props: { onSearch: (value: string) => void, defaultValue: string}) => {
  const { onSearch, defaultValue } = props;
  const [searchString, setSearchString] = useState(defaultValue);
  return (
    <TextInput
        classNames={{
          root: classes.search,
          wrapper: classes.search__wrapper,
          input: classes.search__input,
        }}
        value={searchString}
        type="text"
        onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
          setSearchString(e.target.value);
        }}
        leftSectionPointerEvents="none"
        leftSection={
          <Image 
            width={16} 
            height={16} 
            src={searchIcon} 
            alt="search_icon" 
          />
        }
        rightSection={
          <Button  
            size="vb"
            className={classes.search__button}
            title="Saerch"
            onClick={() => onSearch(searchString)}
          >
            Search
          </Button>
        }
        rightSectionWidth={100}
        placeholder="Search movie title"
      />
  )
}
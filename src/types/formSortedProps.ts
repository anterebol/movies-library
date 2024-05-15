import { KeyAsString } from "./KeyAsString";
import { GenreType } from "./genreType";

export interface FormSortedProps {
  onChange: (apiProps: KeyAsString, isValid: boolean) => void, 
  genres: Array<GenreType>
}
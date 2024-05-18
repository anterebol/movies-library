import { SortType } from "@/constants/formSortedInitialValues";
import { GenreType } from "./genreType";

export interface FormSortedProps {
  onChange: (apiProps: SortType, isValid: boolean) => void, 
  genres: Array<GenreType>
}
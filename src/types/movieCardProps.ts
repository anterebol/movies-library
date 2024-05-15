import { GenreType } from "./genreType";
import { MovieProps } from "./movieType";

export interface MovieCardProps { 
  movie: MovieProps, 
  posterSize: string, 
  allGenres: Array<GenreType>, 
  user_grade?: number, 
  isFullCard: boolean 
}
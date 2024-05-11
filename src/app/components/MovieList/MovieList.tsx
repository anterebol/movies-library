import { MovieProps } from "@/types/movieType"
import { Group } from "@mantine/core"
import { MovieCard } from "./MovieCard/MovieCard";
export interface GenreProps {id: string, name: string};
export interface UserGradeProps { id: number, user_grade: string };

export const MovieList = (props: { movies: MovieProps[], posterSize: string, genres: Array<GenreProps>, user_grades: any}) => {
  const { movies, posterSize, genres, user_grades } = props;
  return (
    <Group justify="space-between">
      {movies.map((movie) => {
        return <MovieCard 
          user_grade={user_grades[movie.original_title]}  
          genres={genres} 
          posterSize={posterSize} 
          key={movie.id} movie={movie} 
        />
      })}
    </Group>)
}
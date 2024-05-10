import { MovieProps } from "@/types/movieType"
import { Group } from "@mantine/core"
import { MovieCard } from "./MovieCard/MovieCard";
export interface GenreProps {id: string, name: string};
export interface UserGradeProps { movie_title: string, user_grade: string };

export const MovieList = (props: { movies: MovieProps[], posterSize: string, genres: Array<GenreProps>, user_grades: Array<UserGradeProps>}) => {
  const { movies, posterSize, genres, user_grades } = props;
  return (
    <Group justify="space-between">
      {movies.map((movie) => {
        return <MovieCard 
          user_grade={user_grades.find(({movie_title}) => movie_title === movie.original_title)?.user_grade}  
          genres={genres} 
          posterSize={posterSize} 
          key={movie.id} movie={movie} 
        />
      })}
    </Group>)
}
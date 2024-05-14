import { Group } from "@mantine/core"
import { MovieCard } from "./MovieCard/MovieCard";
import { useMemo } from "react";
import { getPosterSize } from "@/utils/getPosterSize";
import { useAppSelector } from "@/hooks/hooks";
import Link from "next/link";
export interface GenreProps {id: string, name: string};
export interface UserGradeProps { id: number, user_grade: string };
const moviesPosterSize = 119;

export const MovieList = () => {
  const { movies, genres, postersConfig, user_grades } = useAppSelector((state) => state);
  const posterSize = useMemo(() => getPosterSize(postersConfig.images.poster_sizes, moviesPosterSize), [postersConfig.images.poster_sizes]);

  return (
    <Group justify="space-between">
      {movies.map((movie) => {
        const { id } = movie;
        return (
        <Link key={id} href={`/movie/${id}`}>
          <MovieCard 
            user_grade={user_grades[id]?.user_grade || 0}  
            genres={genres} 
            posterSize={posterSize} 
            movie={movie} 
          />
        </Link>)
      })}
    </Group>)
}


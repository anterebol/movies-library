export interface GenreIds {
  genre_ids: String[];
}
export interface MovieProps extends GenreIds {
  adult: boolean,
  backdrop_path: string,
  id: number,
  original_language: string,
  original_title: string
  overview: string,
  popularity: number,
  poster_path: string,
  release_date: string,
  title: string,
  video: boolean,
  vote_average: number,
  vote_count: number,
}
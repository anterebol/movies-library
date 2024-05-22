export interface GenreIds {
  genre_ids: String[];
}
export interface ProductionCompany {
  logo_path: string, 
  name: string
}
export interface MovieProps extends GenreIds {
  adult: boolean,
  backdrop_path: string,
  id: number,
  budget?: number,
  runtime?: number,
  revenue?: number;
  genres?: Array<{id: string, name: string}>,
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
  production_companies?: Array<ProductionCompany>
}
export interface MovieGradedProps extends MovieProps {
  user_grade: number
}
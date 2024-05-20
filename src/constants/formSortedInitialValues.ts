export type SortType = {
  [key: string]: any,
  genres: Array<string>,
  release_year: string,
  rating_from: string,
  rating_to: string, 
  sort_by: string
};
const initialValues = {
  genres: [],
  release_year: '',
  rating_from: '',
  rating_to: '', 
  sort_by: 'popularity.desc'
} as SortType;

export default initialValues;
import { KeyAsString } from "@/types/KeyAsString";

export const formSortedKeyToApi = {
  genre: 'with_genres',
  release_year: 'primary_release_year',
  rating_from: 'vote_average.gte',
  rating_to: 'vote_average.lte', 
  sort_by: 'sort_by'
} as KeyAsString
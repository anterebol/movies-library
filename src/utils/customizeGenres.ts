import { GenreType } from "@/types/genreType";

export const customizeGenres = (genres: Array<GenreType>) => genres.map(({id, name}) => ({ value: id.toString(), label: name }));
export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type: string;
}

export interface MovieDetails extends Movie {
  Plot: string;
  Director: string;
  Actors: string;
  Genre: string;
  Runtime: string;
  imdbRating: string;
}
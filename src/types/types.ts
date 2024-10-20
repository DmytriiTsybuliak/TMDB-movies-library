import { MovieState } from '../redux/movie/slice';

export interface IMovie {
  id: number;
  title: string;
  poster_path: string;
  original_language: string;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
}

export interface Data {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export interface IMovieByID {
  id: number;
  adult: boolean;
  title: string;
  original_title: string;
  original_language: string;
  backdrop_path: string;
  poster_path: string;
  genres: [{ id: number; name: string }];
  overview: string;
  budget: number;
  imdb_id: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  status: string;
  tagline: string;
}

export interface isActive {
  isActive: boolean;
}

export interface ICast {
  adult: boolean;
  cast_id: number;
  character: string;
  id: number;
  name: string;
  popularity: number;
  profile_path: string;
}

export interface IReviews {
  author: string;
  author_details: {
    name: string;
    avatar_path: string;
    rating: number;
    username: string;
  };
  content: string;
  created_at: string;
  id: number;
  updated_at: string;
  url: string;
}

export interface Movie {
  movie: MovieState;
}

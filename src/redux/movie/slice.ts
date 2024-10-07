import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getMovieListOp,
  getSelectedMovieByID,
  getTrendingMovieList,
  searchMovieReq,
} from './operations';
import { IMovie, IMovieByID } from '../../types/types';

interface MovieState {
  movieList: IMovie[];
  loading: boolean;
  error: string | null;
  trending: 'day' | 'week';
  random_Background: string | '';
  selectedMovie: IMovieByID | null;
}

export const initialState: MovieState = {
  movieList: [],
  loading: false,
  error: null,
  trending: 'day',
  random_Background: '',
  selectedMovie: null,
};

const handlePending = (state: MovieState) => {
  state.loading = true;
};

const handleRejected = (state: MovieState, action: PayloadAction<unknown>) => {
  state.loading = false;
  state.error = (action.payload as { message?: string })?.message || 'An error occurred';
};

const randomNumber = Math.floor(Math.random() * 19);

const movieSlice = createSlice({
  name: 'movie',
  initialState: initialState,
  reducers: {
    setMovieList(state, action) {
      state.movieList = action.payload;
    },
    setTrendingOption(state, action) {
      state.trending = action.payload;
    },
    setRandomBackground(state, action) {
      state.random_Background = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getTrendingMovieList.pending, handlePending)
      .addCase(getTrendingMovieList.fulfilled, (state, action: PayloadAction<IMovie[]>) => {
        state.movieList = action.payload;
        state.selectedMovie = null;
        state.random_Background == ''
          ? (state.random_Background = action.payload[randomNumber].backdrop_path)
          : (state.random_Background = state.random_Background);

        state.loading = false;
      })
      .addCase(getTrendingMovieList.rejected, handleRejected)
      .addCase(searchMovieReq.pending, handlePending)
      .addCase(searchMovieReq.fulfilled, (state, action: PayloadAction<IMovie[]>) => {
        state.movieList = action.payload;
        state.selectedMovie = null;
        state.loading = false;
      })
      .addCase(searchMovieReq.rejected, handleRejected)
      .addCase(getSelectedMovieByID.pending, handlePending)
      .addCase(getSelectedMovieByID.fulfilled, (state, action: PayloadAction<IMovieByID>) => {
        state.selectedMovie = action.payload;
        state.loading = false;
      })
      .addCase(getSelectedMovieByID.rejected, handleRejected)
      .addCase(getMovieListOp.pending, handlePending)
      .addCase(getMovieListOp.fulfilled, (state, action: PayloadAction<IMovie[]>) => {
        state.movieList = action.payload;
        state.selectedMovie = null;
        state.loading = false;
      })
      .addCase(getMovieListOp.rejected, handleRejected);
  },
});
export const { setMovieList, setTrendingOption, setRandomBackground } = movieSlice.actions;
export const movieReducer = movieSlice.reducer;

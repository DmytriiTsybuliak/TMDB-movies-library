import { useEffect } from 'react';
import MovieList from '../components/MovieList/MovieList';
import { Toaster } from 'react-hot-toast';
import { getTrendingMovieList } from '../redux/movie/operations';
import { useDispatch, useSelector } from 'react-redux';
import Trending from '../components/Trending/Trending';
import { selectLoading, selectTrendingOption } from '../redux/movie/selectors';
import SearchForm from '../components/SearchForm/SearchForm';
import Welcome from '../components/Welcome/Welcome';
import { AppDispatch } from '../redux/store';

export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(selectLoading);
  const trendingOption = useSelector(selectTrendingOption);

  useEffect(() => {
    dispatch(getTrendingMovieList(trendingOption));
  }, [trendingOption, dispatch]);

  return (
    !isLoading && (
      <>
        <Toaster />
        <Welcome>
          <SearchForm />
        </Welcome>
        <Trending>
          <MovieList />
        </Trending>
      </>
    )
  );
}

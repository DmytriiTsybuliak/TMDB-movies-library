import { FC, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import MovieList from '../components/MovieList/MovieList';
import { useDispatch, useSelector } from 'react-redux';
import { getMovieListByParam } from '../redux/movie/operations';
import { selectCurrentPage, selectLoading, selectMovieParam } from '../redux/movie/selectors';
import { MoviesCategory } from '../components/MoviesCategory/MoviesCategory';
import Pagination from '../components/Pagination/Pagination';
import { useSearchParams } from 'react-router-dom';

const MoviesPage: FC = () => {
  const isLoading = useSelector(selectLoading);
  const dispatch = useDispatch<any>();
  const movieParams = useSelector(selectMovieParam);
  const currentPage = useSelector(selectCurrentPage);
  const [params, setParams] = useSearchParams();
  const queryURL = params.get('page') ?? '1';

  useEffect(() => {
    dispatch(getMovieListByParam({ range: movieParams, pageN: currentPage }));
  }, [movieParams, dispatch, currentPage]);

  return (
    !isLoading && (
      <div>
        <Toaster />
        <MoviesCategory>
          <MovieList />
          <Pagination />
        </MoviesCategory>
      </div>
    )
  );
};
export default MoviesPage;

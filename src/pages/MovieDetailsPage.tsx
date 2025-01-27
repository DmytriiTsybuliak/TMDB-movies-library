import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectError, selectLoading } from '../redux/movie/selectors';
import { getSelectedMovieByID } from '../redux/movie/operations';
import Loader from '../components/Loader/Loader';
import MovieDetails from '../components/MovieDetails/MovieDetails';
import { AppDispatch } from '../redux/store';

export default function MovieDetailsPage() {
  const { movieID } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const error = useSelector(selectError);
  const isLoading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(getSelectedMovieByID(movieID!));
  }, [movieID, dispatch]);

  return (
    <div>
      {isLoading && <Loader />}
      {error && <div>The resource you requested could not be found.</div>}
      <MovieDetails />
    </div>
  );
}

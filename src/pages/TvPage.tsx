import { useEffect } from 'react';
import { Category } from '../components/Category/Category';
import { useDispatch } from 'react-redux';
import { setMovieParam, setPage } from '../redux/movie/slice';
import { useSearchParams } from 'react-router-dom';
import { getTVShowByParam } from '../redux/movie/operations';
import Pagination from '../components/Pagination/Pagination';
import { AppDispatch } from '../redux/store';
import MovieList from '../components/MovieList/MovieList';
import Container from '../components/Container/Container';

const TvPage = () => {
  const queryParams = ['airing_today', 'on_the_air', 'popular', 'top_rated'];
  const dispatch = useDispatch<AppDispatch>();
  const [params] = useSearchParams();
  const pageParam = params.get('page') ?? '1';
  const sectionParam = params.get('section') ?? 'airing_today';

  useEffect(() => {
    dispatch(setMovieParam(sectionParam));
    dispatch(setPage(Number(pageParam)));
  }, [dispatch, sectionParam, pageParam]);

  useEffect(() => {
    dispatch(getTVShowByParam({ range: sectionParam, pageN: Number(pageParam) }));
    // console.log('pageParam:', pageParam);
    // console.log('sectionParam:', sectionParam);
  }, [dispatch, sectionParam, pageParam]);

  return (
    <div>
      <Category queryParams={queryParams}>
        <Container>
          <MovieList />
          <Pagination />
        </Container>
      </Category>
    </div>
  );
};

export default TvPage;

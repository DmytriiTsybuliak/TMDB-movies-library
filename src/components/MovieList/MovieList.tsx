import { Link, useLocation } from 'react-router-dom';
import css from './MovieList.module.css';
import genres from '../genres.json';
import { FC, ReactNode } from 'react';
import { IMovie } from '../../types/types';
import { useSelector } from 'react-redux';
import { selectLoading, selectMovieList } from '../../redux/movie/selectors';

interface FilteredMovieProps {
  filtered?: IMovie[];
  children?: ReactNode;
}

const MovieList: FC<FilteredMovieProps> = ({ children }) => {
  const genresList = JSON.stringify(genres);
  const genresOBJ = JSON.parse(genresList);
  const isLoading = useSelector(selectLoading);
  const location = useLocation();
  const movieLister: IMovie[] = useSelector(selectMovieList);

  return (
    !isLoading && (
      <div>
        <ul className={css.list}>
          {movieLister.length === 0 && <div>No results</div>}
          {movieLister.map(item => (
            <li key={item.id} className={css.list_item}>
              <Link to={`/movies/${item.id}`} state={location}>
                {item.poster_path != null && (
                  <img
                    loading="lazy"
                    src={`https://media.themoviedb.org/t/p/w220_and_h330_face/${item.poster_path}`}
                    srcSet={`https://media.themoviedb.org/t/p/w220_and_h330_face/${item.poster_path} 1x, https://media.themoviedb.org/t/p/w440_and_h660_face/${item.poster_path} 2x`}
                    alt={item.title}
                    className={css.img_poster}
                  />
                )}
                {item.poster_path == null && (
                  <img
                    loading="lazy"
                    src={`https://davooda.com/images/outline/outline-file-document-question-mark-icon_360_w.png`}
                    alt={'Unknown image'}
                    className={css.img_poster}
                  />
                )}

                <div className={css.title}>{item.title}</div>
                <div className={css.description}>
                  <div className={css.details}>
                    {item.release_date.length != 0 ? item.release_date.substring(0, 4) : null}
                  </div>
                  {item.release_date.length != 0 && item.genre_ids[0] != null && (
                    <span> ,&nbsp;</span>
                  )}
                  <div className={css.details}>
                    {/* {item.genre_ids.map(id =>
                      genresOBJ.map((item: { id: number; name: string }) =>
                        item.id == id ? item.name + ' ' : null
                      )
                    )} */}
                    {item.genre_ids[0] != null &&
                      genresOBJ.map((key: { id: number; name: string }) =>
                        key.id == item.genre_ids[0] ? key.name : null
                      )}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        {children}
      </div>
    )
  );
};

export default MovieList;

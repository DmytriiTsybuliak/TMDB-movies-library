import { useEffect, useState } from 'react';
import { getMovieCasts } from '../api';
import toast, { Toaster } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import css from './MovieCast.module.css';
import { AxiosError } from 'axios';
import { ICast } from '../../types/types';
import Loader from '../Loader/Loader';

export default function MovieCast() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<boolean>(false);
  const { movieID } = useParams();
  const [selectedCast, setSelectedCast] = useState<ICast[] | null>(null);
  const defaultSRC = `https://assets.mycast.io/actor_images/actor-an-unknown-actor-465215_large.jpg`;
  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await getMovieCasts(movieID || '');
        setSelectedCast(data);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        data.length != 0 ? toast.success('Success') : toast.error('No results');
      } catch (e: unknown) {
        setError(true);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        e instanceof AxiosError
          ? toast.error(e.response?.data?.status_message)
          : toast.error('An unkown error occured');
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [movieID]);

  return (
    <div>
      <Toaster />
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <h1>Casts</h1>
          <ul className={css.cast__list}>
            {selectedCast &&
              selectedCast.map(item => (
                <li key={item.cast_id} className={css.cast__card}>
                  <img
                    className={css.image}
                    src={
                      item.profile_path !== null && item.profile_path !== ''
                        ? `https://image.tmdb.org/t/p/w200${item.profile_path}`
                        : defaultSRC
                    }
                    alt={item.name}
                    style={{ width: '200px', height: '300px', objectFit: 'cover' }}
                  />

                  <h2>{item.name}</h2>
                  <p>Character: {item.character || 'Unknown'}</p>
                  <p>Popularity: {item.popularity.toFixed(1)}</p>
                </li>
              ))}
          </ul>
        </>
      )}
    </div>
  );
}

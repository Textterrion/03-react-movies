import styles from './MovieGrid.module.css';
import type { Movie } from '../../types/movie.ts';

interface MovieGridProps {
  onSelect: (movie: Movie) => void;
  movies: Movie[];
}

export default function MovieGrid({ onSelect, movies }: MovieGridProps) {
  if (movies.length === 0) {
    return null;
  }
  
  return (
    <ul className={styles.grid}>
      {movies.map(movie => (
      <li key={movie.id} onClick={() => onSelect(movie)}>
        <div className={styles.card}>
          <img
            className={styles.image}
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            loading="lazy"
          />
          <h2 className={styles.title}>{movie.title}</h2>
        </div>
      </li>))}
    </ul>
  );
}
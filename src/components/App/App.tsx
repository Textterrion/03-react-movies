import styles from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import MovieModal from "../MovieModal/MovieModal";
import MovieGrid from "../MovieGrid/MovieGrid";
import searchMovies from "../../services/movieService.ts";
import { toast, Toaster } from "react-hot-toast";
import { useState } from "react";
import type { Movie } from "../../types/movie.ts";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setMovies([]);
    setError(false);
    setIsLoading(true);
    setSelectedMovie(null);

    try {
      const response = await searchMovies(query);
      if (response.length === 0) {
        toast.error("No movies found for the given query.");
      }
      setMovies(response);
    } catch {
      setError(true);
      toast.error(
        "An error occurred while searching for movies. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };
  const handleCloseModal = () => {
    setSelectedMovie(null);
  }

  return (
    <div className={styles.app}>
      <Toaster position="top-right" />
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {!isLoading && error && <ErrorMessage />}
      {movies.length > 0 && <MovieGrid movies={movies} onSelect={handleSelectMovie} />}
      {selectedMovie && <MovieModal movie={selectedMovie} onClose={handleCloseModal} />}
    </div>
  )
}

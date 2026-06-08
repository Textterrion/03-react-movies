import axios from "axios";
import type { Movie } from "../types/movie";

const API_URL = "https://api.themoviedb.org/3/search/movie";
const API_KEY = import.meta.env.VITE_TMDB_TOKEN;

interface SearchMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export default async function searchMovies(query: string): Promise<Movie[]> {
  try {
    const { status, data } = await axios.get<SearchMoviesResponse>(API_URL, {
      params: {
        query
      },
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      }
    })
    if (status !== 200) {
      throw new Error(`TMDb API error: ${status}`);
    }
    return data.results;
  } catch (error) {
    console.error("Error searching movies:", error);
    throw error;
  }
}
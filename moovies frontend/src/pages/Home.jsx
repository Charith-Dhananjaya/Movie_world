import MovieCard from "../components/MovieCard";
import { useEffect, useState } from "react";
import "../css/Home.css";
import { searchMovies, getPopularMovies } from "../services/api";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [originalMovies, setOriginalMovies] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;

    setLoading(true);
    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Failed to search movies...");
    } finally {
      setLoading(false);
    }

    setSearchQuery("");
  };
  const searchMoviesByVotes = () => {
    console.log(movies);
    const votes = movies.filter((movie) => {
      return movie.vote_count > 500;
    });
    console.log(votes);
    setMovies(votes);
  };

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        console.log(popularMovies);
        setOriginalMovies(popularMovies);
        setMovies(popularMovies);
      } catch (err) {
        console.log(err);
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };
    loadPopularMovies();
  }, []);

 

  const handleChange = (c) => {
    const ratingNum = Number(c)
    console.log(c, movies);

    const moviesToRate = originalMovies.filter((movie) => {
      // console.log(movie.rating)
      return movie.rating === ratingNum
    })
    console.log(moviesToRate)
    setMovies(moviesToRate);
  }

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          className="searh-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
        <button onClick={() => searchMoviesByVotes()} className="vote-button">
          Find by votes
        </button>
        <label for="Rating" className="rating">Choose a Rating:</label>
        <select id="Rating" name="Rating"  onChange={e => handleChange(e.target.value)} className="dropdown">
         <option value="1">1</option>
         <option value="2">2</option>
         <option value="3">3</option>
         <option value="4">4</option>
         <option value="5">5</option>
         <option value="6">6</option>
         <option value="7">7</option>
         <option value="8">8</option>
         <option value="9">9</option>
         <option value="10">10</option>
        </select>
      </form>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;

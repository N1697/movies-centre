import React from "react";
import { nanoid } from "nanoid";
import "./App.css";
import MovieCard from "./components/MovieCard";
import SearchIcon from "./search.svg";
//22062975

const API_URL = "http://www.omdbapi.com?apikey=22062975";

const App = () => {
  const [movies, setMovies] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState([]);

  const searchMovies = async (title) => {
    const res = await fetch(`${API_URL}&s=${title}`);
    const data = await res.json();

    setMovies(data.Search);
  };

  React.useEffect(() => {
    searchMovies("");
  }, []);

  return (
    <div className="app">
      <h1>Movies Centre</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Search for movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="Search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => {
            return <MovieCard key={nanoid} movie={movie} />;
          })}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found!</h2>
        </div>
      )}
    </div>
  );
};

export default App;

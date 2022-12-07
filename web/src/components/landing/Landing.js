import React, { useState, useEffect } from "react";
import { Router } from "react-router-dom";
import "../../utilities/App.css";
import { Header, Movie, Search, Navbar } from "../../components";
import { Container } from "reactstrap";

const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=4a3b711b";

const Landing = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    fetch(MOVIE_API_URL)
      .then((response) => response.json())
      .then((jsonResponse) => {
        setMovies(jsonResponse.Search);
        setLoading(false);
      });
  }, []);

  const search = (searchValue) => {
    setLoading(true);
    setErrorMessage(null);

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (jsonResponse.Response === "True") {
          setMovies(jsonResponse.Search);
          setLoading(false);
        } else {
          setErrorMessage(jsonResponse.Error);
          setLoading(false);
        }
      });
  };

  return (
    <>
      <div className="gradient__bg">
        <Navbar />
      </div>
      <Header text="Sharing a few of our favourite movies" />
      <Container>
        <Search search={search} />
        <p className="App-intro"></p>
        <div className="movies">
          {loading && !errorMessage ? (
            <span>loading...</span>
          ) : errorMessage ? (
            <div className="errorMessage">{errorMessage}</div>
          ) : (
            movies.map((movie, index) => (
              <Movie key={`${index}-${movie.Title}`} movie={movie} />
            ))
          )}
        </div>
      </Container>
    </>
  );
};

export default Landing;

import React, { useState, useEffect } from "react";
import { apis as api } from "../../services/api.action";
import { cnt } from "../../services/constant.action";
import { Link } from "react-router-dom";
import "./movie.css";
import history from "../../history";
import { Header, Movie, Search, Navbar, Landing } from "../../components";
import { Container } from "reactstrap";
import { BOM } from "../../services/defined.action";


const DEFAULT_PLACEHOLDER_IMAGE =
  "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";

const ManageMovie = () => {
  const poster = DEFAULT_PLACEHOLDER_IMAGE;

  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  useEffect(()=>{
    getMovie()
  },[])

  const onSelectMovie = (objParam) => {
    // console.log(objParam);
    history.push("movie-detail", {
      ggParam: objParam,
    });
  };

  function getMovie() {

    BOM.LoadAlert(cnt.LOAD, "Processing");

    const body = {
      // profileId: PROFILE_ID,
      // criteria: params.criteria,
      // userToken: token,
    };

    BOM.FetchReqAction(body, api.GetMovie, (err, res) => {
      if (err) {
        BOM.AlertMsg(cnt.DANGER, err);
      } else {
        const objList = res.movieListing;
        setMovies(objList)
        setLoading(false);
      }
    });
  }

  return (
    <>
      <div className="gradient__bg">
        <Navbar />
      </div>
      <Header text="Sharing a few of our favourite movies" />
      <Container>
        <p className="App-intro"></p>
        <div className="movies">
          {loading ? (
            <span>loading...</span>
          ) : (
            movies.map((movie, index) => (
              <div className="movie" key={index}>
                <h2>{movie.NAME}</h2>

                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => onSelectMovie(movie)}
                >
                  <img
                    width="200"
                    alt={`The movie titled: ${movie.NAME}`}
                    src={movie.PHOTO ? movie.PHOTO : poster}
                  />
                </div>
                <p>( {movie.RELEASE_DATE} )</p>
              </div>
            ))
          )}
        </div>
      </Container>
    </>
  );
};

export default ManageMovie;

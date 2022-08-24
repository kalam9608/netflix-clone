import movieTrailer from "movie-trailer";
import React from "react";
import { useState, useEffect } from "react";
import YouTube from "react-youtube";
import "./Row.css";
// import axios from 'axios';

const base_url = "http://image.tmdb.org/t/p/original";

const Row = (props) => {
  // destructuring of props
  const { title, fetchUrl, isLargeRow } = props;

  // STATES
  const [movies, setMovies] = useState([]);

  //  trailer state
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      // let url=`https://api.themoviedb.org/3${props.fetchUrl}`
      let url = `https://api.themoviedb.org/3${fetchUrl}`;

      const data = await fetch(url);

      const parsedata = await data.json();

      // return parsedata;

      setMovies(parsedata.results);
    };

    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "200",
    with: "100%",
    playerVars: {
      // https://www.youtube.com/watch?v=XtMThy8QKqU
      autoplay: 1,
    },
  };

  const handleclick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || "")
        .then((url) => {
          //  https://www.youtube.com/watch?v=XtMThy8QKqU
          const urlParms = new URLSearchParams(new URL(url).search);
          // urlParms.get("v");
          setTrailerUrl(urlParms.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row_posters">
        {/* sevral row poster is here */}

        {movies.map((movie) => {
          // console.log(movie)

          return (
            <img
              className={`row_poster ${props.isLargeRow && "row_posterLarge"}`}
              key={movie.id}
              onClick={() => handleclick(movie)}
              src={`${base_url}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
            />
          );
        })}
      </div>

      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};

export default Row;

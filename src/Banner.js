import React from "react";
import { useState, useEffect } from "react";
import requests from "./requests";
import "./Banner.css";

const Banner = () => {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    const getdata = async () => {
      let url = `https://api.themoviedb.org/3${requests.fetchNetflixOriginals}`;

      const data = await fetch(url);

      const parsedata = await data.json();

      setMovie(
        parsedata.results[Math.floor(Math.random() * parsedata.results.length)]
      );
    };
    getdata();
  }, []);

  console.log("this is the", movie.name);

  const trucate=(str,n)=>{
    return str?.length>n ? str.substr(0 , n-1)+"...":str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner_contents">
      {/* title */}
        <h2 className="banner_title">{movie.name}</h2>
        {/* div 2 buttons */}
      <button className="banner_buttons">Play</button>
      <button className="banner_buttons">My List</button>
        {/* description */}
        <h1 className="banner_description">{trucate(movie.overview,100)}</h1>
      </div>
      <div className="Banner_fedbutton"/>
    </header>
  );
};

export default Banner;

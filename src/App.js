import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
// ApiKey a9187bf5


import './App.css';
import SearchIcon from './search.svg';

const Api_URL = 'http://www.omdbapi.com?apikey=a9187bf5';

const movie1 = {
    "Title": "Superman, Spiderman or Batman",
    "Year": "2011",
    "imdbID": "tt2084949",
    "Type": "movie",
     "Poster": "https://m.media-amazon.com/images/M/MV5BMjQ4MzcxNDU3N15BMl5BanBnXkFtZTgwOTE1MzMxNzE@._V1_SX300.jpg"
    
};
const App = () => {

    const [movies,setMovies]=useState([]);
    const [searchTerm,setsearchterm]=useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${Api_URL}&s=${title}`);
        const data = await response.json();

       setMovies(data.Search);
    }

    useEffect(() => {
        async function fetchMovies() {
          const response = await fetch(`${Api_URL}`);
          const data = await response.json();
          setMovies(data.movies);
        }
        
        fetchMovies();
      }, []);



    return(
       <div className="app">

        <h1>MovieLand</h1>

        <div className="search">
        <input placeholder="Search For Movies" value={searchTerm} onChange={(e)=>setsearchterm(e.target.value)} />
        <img src={SearchIcon} alt="search" onClick={()=>searchMovies(searchTerm)}></img>
        </div>

        
      
        {movies?.length > 0 ? (
        <div className="container">
          {
          movies.map((movie) => (
            <MovieCard movie={movie} />
          ))
          }
        </div>
      ) : (
        <div className="empty">
          <h2>Please Enter A movie To Search For</h2>
        </div>
      )}
    </div>
)};
export default App;
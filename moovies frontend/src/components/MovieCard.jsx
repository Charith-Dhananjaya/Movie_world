import React, { useState } from 'react'
import "../css/MovieCard.css"
import { useMovieContext } from "../contexts/MovieContext"

function MovieCard({movie}) {

    const {isFavorite, addToFavorites, removeFromFavorites} = useMovieContext()
    const favorite = isFavorite(movie.id)

    const [count, setCount] = useState(0)


    function onFavoriteClick(e) {
        e.preventDefault()
        if (favorite) removeFromFavorites(movie.id)
        else addToFavorites(movie)
    }

    const increase = () => {
        console.log(count)
        const increaseValue = (count) => {
            console.log("adwa",(count < 10) ? (count + 1) : 0)
          return (count < 10) ? (count + 1) : 0
        }
        setCount(increaseValue)
    }

    const decrease = () => {
        console.log(count)
        const decreaseValue = (count) => {
            return (count > 0) ? (count - 1) : 0    
        }
        setCount(decreaseValue)
    }

    return <div className="movie-card">
        <div className='movie-poster'>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <div className="movie-overlay">
            <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>
                    ♥
                </button>
            </div>
        </div>
        <div className='movie-info'>
            <h3>{movie.title}</h3>
            <p>{movie.release_date?.split("-")[0]}</p>
            <button className='minus-button' onClick={() => decrease()}>-</button>
            <div className='value'>{count}</div>
            <button className='plus-button' onClick={() => increase()}>+</button>
        </div>
    </div>
}

export default MovieCard;
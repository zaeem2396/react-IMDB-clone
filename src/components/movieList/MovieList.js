import React, { useEffect, useState } from 'react'
import Card from '../card/Card'
import './MovieList.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function MovieList() {
    const [movieList, setMovieList] = useState([])
    const { type } = useParams()

    useEffect(() => {
        fetchPopularMovies()
    }, [])

    useEffect(() => {
        fetchPopularMovies()
    }, [type])

    const fetchPopularMovies = async () => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${type ? type : "popular"}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
            setMovieList(response.data.results);
        } catch (error) {
            console.error(`Error fetching data: ${error}`)
        }
    }

    return (
        <div className="IMDB_movie__list">
            <h2 className="IMDB_list__title">{(type ? type : "popular").toUpperCase()}</h2>
            <div className="IMDB_list__cards">
                {
                    movieList.map(movie => (
                        <Card movie={movie} />
                    ))
                }
            </div>
        </div>
    )
}

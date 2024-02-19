import React, { useEffect, useState } from 'react'
import { FaStar } from "react-icons/fa";
import './Home.css'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import axios from 'axios'
import { Link } from 'react-router-dom';
import MovieList from '../../components/movieList/MovieList';

export default function Home() {
    const [popularMovies, setPopularMovies] = useState([])
    useEffect(() => {
        const fetchPopularMovies = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
                setPopularMovies(response.data.results);
            } catch (error) {
                console.error(`Error fetching data: ${error}`)
            }
        }
        fetchPopularMovies()
    }, [])

    return (
        <>
            <div className="IMDB_poster">
                <Carousel
                    showThumbs={false}
                    autoPlay={true}
                    transitionTime={3}
                    infiniteLoop={true}
                    showStatus={false}
                >
                    {
                        popularMovies.map(movie => (
                            <Link style={{ textDecoration: "none", color: "#fff" }} to={`/movie/${movie.id}`}>
                                <div className="IMDB_poster-image">
                                    <img src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`} />
                                </div>
                                <div className="IMDB_poster-image__overlay">
                                    <div className="IMDB_poster-image__title">{movie ? movie.original_title : ""}</div>
                                    <div className="IMDB_poster-image__runtime">
                                        {movie ? movie.release_date : ""}
                                        <sfan className="IMDB_poster-image__rating">
                                            {movie ? movie.vote_average : ""}
                                            <FaStar /> {" "}
                                        </sfan>
                                    </div>
                                    <div className="IMDB_poster-image__desc">
                                        {movie ? movie.overview : ""}
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </Carousel>
                <MovieList />
            </div>
        </>
    )
}

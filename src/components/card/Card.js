import React, { useEffect, useState } from 'react'
import './Card.css'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

export default function Card() {
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 1500);
    }, [])
    return <>
        {
            isLoading
                ?
                <div className="IMDB_cards">
                    <SkeletonTheme
                        color="#202020" highlightColor="#444">
                        <Skeleton height={300} duration={2} />
                    </SkeletonTheme>
                </div>
                :
                <Link to={`movie/${movie.id}`} style={{ textDecoration: "none", color: "#fff" }}>
                    <div className="IMDB_cards">
                        <img className="IMDB_cards__img" src={`https://image.tmdb.org/t/p/original${movie ? movie.poster_path : ""}`} />
                        <div className="IMDB_cards__overlay">
                            <div className="IMDB_cards__title">{movie ? movie.original_title : ""}</div>
                            <div className="IMDB_cards__runtime">
                                {movie ? movie.release_date : ""}
                                <span className="IMDB_cards__rating">{movie ? movie.vote_average : ""} <FaStar /></span>
                            </div>
                            <div className="IMDB_cards__desc">{movie ? `${movie.overview.slice(0, 118)}...` : ""}</div>
                        </div>
                    </div>
                </Link>
        }
    </>
}

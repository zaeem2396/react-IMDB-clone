import axios from 'axios'
import './Movie.css'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FaExternalLinkAlt } from 'react-icons/fa'

export default function MovieDetail() {
  const [currentMovieDetail, setMovie] = useState()
  const { id } = useParams()

  useEffect(() => {
    fetchPopularMovies()
    window.scrollTo(0, 0)
  }, [])

  const fetchPopularMovies = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
      setMovie(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error(`Error fetching data: ${error}`)
    }
  }

  return (
    <div className="movie">
      <div className="movie__intro">
        <img className="movie__backdrop" src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.backdrop_path : ""}`} />
      </div>
      <div className="movie__detail">
        <div className="movie__detailLeft">
          <div className="movie__posterBox">
            <img className="movie__poster" src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.poster_path : ""}`} />
          </div>
        </div>
        <div className="movie__detailRight">
          <div className="movie__detailRightTop">
            <div className="movie__name">{currentMovieDetail ? currentMovieDetail.original_title : ""}</div>
            <div className="movie__tagline">{currentMovieDetail ? currentMovieDetail.tagline : ""}</div>
            <div className="movie__rating">
              {currentMovieDetail ? currentMovieDetail.vote_average : ""} <FaExternalLinkAlt />
              <span className="movie__voteCount">{currentMovieDetail ? "(" + currentMovieDetail.vote_count + ") votes" : ""}</span>
            </div>
            <div className="movie__runtime">{currentMovieDetail ? currentMovieDetail.runtime + " mins" : ""}</div>
            <div className="movie__releaseDate">{currentMovieDetail ? "Release date: " + currentMovieDetail.release_date : ""}</div>
            <div className="movie__genres">
              {
                currentMovieDetail && currentMovieDetail.genres
                  ?
                  currentMovieDetail.genres.map(genre => (
                    <><span className="movie__genre" id={genre.id}>{genre.name}</span></>
                  ))
                  :
                  ""
              }
            </div>
          </div>
          <div className="movie__detailRightBottom">
            <div className="synopsisText">Synopsis</div>
            <div>{currentMovieDetail ? currentMovieDetail.overview : ""}</div>
          </div>

        </div>
      </div>
      <div className="movie__links">
        <div className="movie__heading">Useful Links</div>
        {
          currentMovieDetail && currentMovieDetail.homepage && <a href={currentMovieDetail.homepage} target="_blank" style={{ textDecoration: "none" }}><p><span className="movie__homeButton movie__Button">Homepage <FaExternalLinkAlt className="newTab" /></span></p></a>
        }
        {
          currentMovieDetail && currentMovieDetail.imdb_id && <a href={"https://www.imdb.com/title/" + currentMovieDetail.imdb_id} target="_blank" style={{ textDecoration: "none" }}><p><span className="movie__imdbButton movie__Button">IMDb<FaExternalLinkAlt className="newTab" /></span></p></a>
        }
      </div>
      <div className="movie__heading">Production companies</div>
      <div className="movie__production">
        {
          currentMovieDetail && currentMovieDetail.production_companies && currentMovieDetail.production_companies.map(company => (
            <>
              {
                company.logo_path
                &&
                <span className="productionCompanyImage">
                  <img className="movie__productionComapany" src={`https://image.tmdb.org/t/p/original${company.logo_path}`} />
                  <span>{company.name}</span>
                </span>
              }
            </>
          ))
        }
      </div>
    </div>
  )
}

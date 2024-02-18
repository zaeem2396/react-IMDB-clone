import React, { useEffect, useState } from 'react'
import Card from '../card/Card'
import './MovieList.css'
import { useParams } from 'react-router-dom'

export default function MovieList() {
    const [movieList, setMovieList] = useState([])
    const {type} = useParams()

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        getData()
    }, [type]) 

  return (
    <div>MovieList</div>
  )
}

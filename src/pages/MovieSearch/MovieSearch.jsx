import React, { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'

import './Movies.css'

const Movies = () => {
  const [searchParams] = useSearchParams()

  const [movies, setMovies] = useState([])
  const [searchValue, setSearchValue] = useState(
    searchParams.get('search') || ''
  )
  const [filter, setFilter] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const hasInitialized = useRef(false)

  //HISTORY DATA

  const API_KEY = 'e45154c6'

  const fetchMovies = async (search = searchValue, sortFilter = filter) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(
          search
        )}`
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.Response === 'False') {
        throw new Error(data.Error || 'No movies found')
      }

      let movieData = data.Search || []

      // Apply sorting if filter is set
      if (sortFilter === 'NEW_TO_OLD') {
        movieData = [...movieData].sort((a, b) => {
          const yearA = parseInt(a.Year) || 0
          const yearB = parseInt(b.Year) || 0
          return yearB - yearA
        })
      } else if (sortFilter === 'OLD_TO_NEW') {
        movieData = [...movieData].sort((a, b) => {
          const yearA = parseInt(a.Year) || 0
          const yearB = parseInt(b.Year) || 0
          return yearA - yearB
        })
      }

      setMovies(movieData)
    } catch (err) {
      setError(err.message)
      setMovies([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearchChange = event => {
    setSearchValue(event.target.value)
  }

  const handleFilterChange = event => {
    const newFilter = event.target.value
    setFilter(newFilter)
    fetchMovies(searchValue, newFilter)
  }

  const handleSearchSubmit = event => {
    if (event) {
      event.preventDefault()
    }
    fetchMovies()
  }

  const rerouteToMovieDetails = imdbID => {
    // In a real app, you might use React Router or similar
    // For now, we'll just log it and could navigate to a details page
    console.log(`Navigating to movie details for ID: ${imdbID}`)
    // Example with React Router:
    // history.push(`/movie/${imdbID}`);
    // Or window.location.href = `/movie/${imdbID}`;

    // For demonstration, let's open the IMDB page
    window.open(`https://www.imdb.com/title/${imdbID}`, '_blank')
  }

  // Initial fetch on component mount
  useEffect(() => {
    if (!hasInitialized.current) {
      fetchMovies()
      hasInitialized.current = true
    }
  })

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (hasInitialized.current) {
        fetchMovies()
      }
    }, 500) // 500ms debounce

    return () => clearTimeout(timer)
  }, [searchValue])

  return (
    <div className='movies'>
      <div className='movies__controls'>
        <form onSubmit={handleSearchSubmit} className='movies__search-form'>
          <input
            type='text'
            className='movies__search-input'
            placeholder='Search for movies...'
            value={searchValue}
            onChange={handleSearchChange}
          />
          <button type='submit' className='movies__search-button'>
            Search
          </button>
        </form>

        <div className='movies__filter'>
          <label htmlFor='filter' className='movies__filter-label'>
            Sort by:
          </label>
          <select
            id='filter'
            className='movies__filter-select'
            value={filter}
            onChange={handleFilterChange}
          >
            <option value=''>Default</option>
            <option value='NEW_TO_OLD'>Newest to Oldest</option>
            <option value='OLD_TO_NEW'>Oldest to Newest</option>
          </select>
        </div>
      </div>

      {isLoading && (
        <div className='movies__loading'>
          <div className='loading-spinner'></div>
          <p>Loading movies...</p>
        </div>
      )}

      {error && (
        <div className='movies__error'>
          <p>Error: {error}</p>
        </div>
      )}

      {!isLoading && !error && movies.length === 0 && (
        <div className='movies__empty'>
          <p>No movies found. Try a different search.</p>
        </div>
      )}

      <ul className='movies__container'>
        {movies.map(movie => (
          <li
            key={movie.imdbID}
            className='movie'
            onClick={() => rerouteToMovieDetails(movie.imdbID)}
          >
            <p className='movie__title'>
              {movie.Title} ({movie.Year})
            </p>
            <img
              src={
                movie.Poster !== 'N/A'
                  ? movie.Poster
                  : 'https://via.placeholder.com/300x450?text=No+Poster'
              }
              alt={`${movie.Title} Poster`}
              className='movie__poster'
              onError={e => {
                e.target.src =
                  'https://via.placeholder.com/300x450?text=No+Poster'
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Movies

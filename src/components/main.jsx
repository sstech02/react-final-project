import { Link } from 'react-router-dom'
import React, { useState } from 'react'
function Main () {
  const [value, setValue] = useState('')
  function handleChange (e) {
    setValue(e.target.value)
  }
  return (
    <main>
      <section id='main'>
        <div className='container'>
          <div className='row'>
            <div className='main__container'>
              <h1>Movie Searcher</h1>
              <h2>Find your favorite movies</h2>
            </div>
            <input
              type='search'
              className='search-bar'
              value={value}
              onChange={handleChange}
            />
            {value.length > 0 && (
              <div className='search-options-wrapper'>
                <Link to={`MovieSearch?search=${value}`}>
                  <button className='search-button'>Search</button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
      <section>
        <div className='container'>
          <div className='row'>
            <i className='fa-solid fa-spinner movies__loading--spinner' />
          </div>
        </div>
      </section>
    </main>
  )
}

export default Main

import { Link, useHistory, useParams } from 'react-router-dom'
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
          </div>
        </div>
        <input
          type='search'
          className='search-bar'
          value={value}
          onChange={handleChange}
        />
        <div className='search-options-wrapper'>
          <Link to={{ pathname: '/MovieSearch', state: { value } }}>
            <button className='search-button'>Search</button>
          </Link>
        </div>
      </section>
      <section>
        <div className='container'>
          <i className='fa-solid fa-spinner movies__loading--spinner' />
          <div className='row'></div>
        </div>
      </section>
    </main>
  )
}

export default Main

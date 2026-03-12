import Home from './pages/Home/Home'
import MovieSearch from './pages/MovieSearch/MovieSearch'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App () {
  return (
    <Router basename={process.env.PUBLIC_URL || '/'}>
      <div className='App'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/MovieSearch' element={<MovieSearch />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

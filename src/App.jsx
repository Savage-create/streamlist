import { NavLink, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Movies from './pages/Movies.jsx'
import Cart from './pages/Cart.jsx'
import About from './pages/About.jsx'

export default function App(){
  return (
    <div>
      <div className="top">
        <div className="logo">
          <span className="badge"></span>
          <span>StreamList</span>
        </div>
        <NavLink to="/" end>StreamList</NavLink>
        <NavLink to="/movies">Movies</NavLink>
        <NavLink to="/cart">Cart</NavLink>
        <NavLink to="/about">About</NavLink>
      </div>

      <div className="wrap">
        <div className="card">
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/movies" element={<Movies/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/about" element={<About/>}/>
          </Routes>
        </div>
      </div>
    </div>
  )
}

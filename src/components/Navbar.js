import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to="/" className="navbar-brand"> products user </Link>
        <Link to="/adminAuth" className="navbar-brand"> admin auth </Link>
        <Link to="/admin" className="navbar-brand"> products admin </Link>
        <Link to="/admin/add" className="navbar-brand"> add </Link>
    </nav>
    
  )
}

export default Navbar

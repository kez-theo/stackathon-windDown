import React from 'react'
import {connect} from 'react-redux'
import {Link, NavLink} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <NavLink className="navItem" to="/home">Wind Down</NavLink>
          <div className="nav-right">
            <NavLink className="navItem" to="/my-routine">My Routine</NavLink>
            <NavLink className="navItem" to="/#" onClick={handleClick}>Logout</NavLink>
          </div>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <NavLink className="navItem" to="/login">Wind Down</NavLink>
          <div className="nav-right">
            <NavLink className="navItem" to="/login">Login</NavLink>
            <NavLink className="navItem" to="/signup">Sign Up</NavLink>
          </div>
        </div>
      )}
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

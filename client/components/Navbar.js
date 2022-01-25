import React from 'react'
import {connect} from 'react-redux'
import {Link, NavLink} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <div className='container'>
      <h1 className='title'>wind down</h1>
    </div>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <NavLink className="navItem" to="/home">home</NavLink>
          <div className="nav-right">
            <NavLink className="navItem" to="/my-room">my room</NavLink>
            <NavLink className="navItem" to="/edit-routine">edit routine</NavLink>
            <NavLink className="navItem" to="/#" onClick={handleClick}>logout</NavLink>
          </div>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <div className="nav-right">
            <NavLink className="navItem" to="/login">login</NavLink>
            <NavLink className="navItem" to="/signup">sign up</NavLink>
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

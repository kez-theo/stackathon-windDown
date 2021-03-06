import React from 'react'
import {connect} from 'react-redux'
import {authenticate} from '../store'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <>
      <div className='login-card'>
        <h2>Welcome!</h2>
        <form onSubmit={handleSubmit} name={name}>
          <div>
            <input placeholder="Enter Username" name="username" type="text" />
          </div>
          <div>
            <input placeholder="Enter Password" name="password" type="password" />
          </div>
          <div className="container">
            <button type="submit">{displayName}</button>
          </div>
          {error && error.response && <h4 style={{display: 'flex', justifyContent: 'center'}}> {error.response.data} </h4>}
        </form>
      </div>
    </>
    
  )
}

const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const username = evt.target.username.value
      const password = evt.target.password.value
      dispatch(authenticate(username, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

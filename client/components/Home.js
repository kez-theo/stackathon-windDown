import React from 'react'
import {connect} from 'react-redux'
import UserRoutine from './UserRoutine'

/**
 * COMPONENT
 */
export const Home = props => {
  const {username, bedtime} = props
  console.log(props)

  return (
    <div>
      <h2>Welcome, {username}!</h2>
      <h2>Your bedtime is {bedtime}</h2>
      <UserRoutine />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    username: state.auth.username,
    bedtime: state.auth.bedtime,
  }
}

export default connect(mapState)(Home)

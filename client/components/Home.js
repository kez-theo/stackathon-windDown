import React from 'react'
import {connect} from 'react-redux'
import UserRoutine from './UserRoutine'
import Three from './Three'

/**
 * COMPONENT
 */
export const Home = props => {
  const {username, bedtime} = props
  console.log(props)

  return (
    <div className='row'>
      <div className='column-40'>
        <h2>good evening, {username}!</h2>
        <h2>your bedtime is {bedtime}</h2>
        <UserRoutine />
      </div>
      <div className='column-60'>
        <Three />
      </div>
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

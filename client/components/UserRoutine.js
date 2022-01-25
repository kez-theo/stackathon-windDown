import React from 'react'
import { connect } from "react-redux";
import { fetchRoutine } from "../store/activities";
import {Link} from 'react-router-dom'

class Routine extends React.Component {
  componentDidMount() {
    this.props.fetchRoutine()
  }

  render() {
    const routine = this.props.routine || [];
    return (
      <>
        <div>
          {routine.length < 1 ? (
            <div>
              <h3>Create your Bedtime Routine</h3>
              <Link to="edit-routine">
                <button>Create</button>
              </Link>
          </div> 
          ) : (
            <div>
              <table className='room'>
                {routine.map((activity) => (
                  <tr className='room' key={activity.id}>
                    <td className='room'>{activity.activityName}</td>
                    <td className='room'>{activity.duration} minutes</td>  
                  </tr>
                ))}
              </table>
            </div>
          )}
        </div>
      </>
    )
  }
}

const mapState = (state) => ({
  routine: state.routineReducer
});

const mapDispatch = (dispatch) => ({
  fetchRoutine: () => dispatch(fetchRoutine()),
});

export default connect(mapState, mapDispatch)(Routine);
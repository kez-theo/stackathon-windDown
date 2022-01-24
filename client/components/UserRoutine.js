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
              {routine.map((activity) => (
                <div key={activity.id}>
                  <div className={"routine"} >
                    <h2 className={"routine-item"}>{activity.activityName}</h2>
                    <h2>{activity.duration} minutes</h2>
                  </div>    
                </div>
              ))}
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
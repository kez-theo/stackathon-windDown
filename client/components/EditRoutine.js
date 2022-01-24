import React from 'react'
import { connect } from "react-redux";
import { fetchRoutine, createActivity, deleteActivity } from "../store/activities";
import AddActivity from './AddActivity';
import { withRouter} from 'react-router'

class EditRoutine extends React.Component {
  
  componentDidMount() {
    this.props.fetchRoutine()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.routine.length !== this.props.routine.length) {
      this.props.fetchRoutine()
    }
  }

  render() {
    const routine = this.props.routine || [];
    return (
      <>
        <div className={"container"}>
          <AddActivity />
          {routine.length < 1 ? (
            <div>
              <h2>Add Activities to Create your Routine</h2>
            </div>
          ) : (
            <div>
              {routine.map((activity) => (
                <div key={activity.id}>
                  <div className={"routine"} >
                    <h2 className={"routine-item"}>{activity.activityName}</h2>
                    <h2>{activity.duration} minutes</h2>
                    <div className={"container"}>
                      <button 
                        onClick={() => this.props.deleteActivity(activity.id)}>
                        X
                      </button>
                    </div>    
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
  createActivity: (activity) => dispatch(createActivity(activity, history)),
  deleteActivity: (activityId) => dispatch(deleteActivity(activityId, history)),
});

export default withRouter(connect(mapState, mapDispatch)(EditRoutine));
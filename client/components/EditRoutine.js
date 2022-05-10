import React from 'react'
import { connect } from "react-redux";
import { addActivity, removeActivity, fetchRoutine } from "../store/routine";
import { fetchActivities } from "../store/activities";
import AddActivity from './AddActivity';
import { withRouter} from 'react-router'

class EditRoutine extends React.Component {
  
  componentDidMount() {
    this.props.fetchRoutine()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.routine.length !== this.props.routine.length) {
      this.props.fetchActivities()
    }
  }

  render() {
    const routine = this.props.routine || [];
    return (
      <>
        <div  className="container">
          <AddActivity />
          {routine.length < 1 ? (
            <div>
              <h2>Add Activities to Create your Routine</h2>
            </div>
          ) : (
            <div>
              <table>
                {routine.map((activity) => (
                  <tr key={activity.id}>
                    <td>{activity.activityName}</td>
                    <td>{activity.duration} minutes</td>
                    <td>
                      <button 
                        onClick={() => this.props.deleteActivity(activity.id)}>
                        ✖
                      </button>
                    </td>       
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
  fetchActivities: () => dispatch(fetchActivities()),
  createActivity: (activity) => dispatch(createActivity(activity, history)),
  deleteActivity: (activityId) => dispatch(deleteActivity(activityId, history)),
});

export default withRouter(connect(mapState, mapDispatch)(EditRoutine));
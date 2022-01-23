import React from 'react'
import { connect } from "react-redux";
import { fetchRoutine } from "../store/activities";

class EditRoutine extends React.Component {
  componentDidMount() {
    this.props.fetchRoutine()
  }

  render() {
    const routine = this.props.routine || [];
    return (
      <>
        <div>
          <h1>My Routine</h1>
        </div>
        <div>
          {routine.map((activity) => (
            <div key={activity.id}>
              <div className={"routine"} >
                <h3 className={"routine-item"}>{activity.name}</h3>
                <h3>{activity.duration} minutes</h3>
              </div>    
            </div>
          ))}
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

export default connect(mapState, mapDispatch)(EditRoutine);
import { connect } from "react-redux";
import { fetchRoutine } from "../store/activities";
import { fetchSingleUser } from "../store/users";

class Routine extends React.Component {
  componentDidMount() {
    this.props.fetchRoutine()
  }

  render() {
    const routine = this.props.activities || [];
    console.log(routine)
    return (
      <>
        <div>
          <h1>My Routine</h1>
        </div>
        <div>
          {routine.map((activity) => (
            <div key={activity.id}>
              <h3>{routine.name}</h3>
              <h3>{routine.duration}</h3>  
              <h3>{routine.time}</h3>    
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

export default connect(mapState, mapDispatch)(Routine);
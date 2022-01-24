import React from 'react'
import { connect } from "react-redux";
import { createActivity } from "../store/activities";
import { withRouter } from 'react-router'

class AddActivity extends React.Component {
  constructor() {
    super();
    this.state = {
      activityName: "",
      duration: ""
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.createActivity({ ...this.state })
  }

  render() {
    const { activityName, duration } = this.state;
    const { handleSubmit, handleChange } = this;

    return (
      <>
        <div>
          <form  className="routine" name="add-activity" onSubmit={handleSubmit}>
            <div>
              <input placeholder="Enter Activity" type="text" name="activityName" onChange={handleChange} value={activityName} />
            </div>
            <div>
              <input placeholder="Enter Time" name="duration" type="text" onChange={handleChange} value={duration} />
            </div>
            <div className="container">
              <button type="submit">Add</button>
            </div>
            {/* {error && error.response && <h4 style={{display: 'flex', justifyContent: 'center'}}> {error.response.data} </h4>} */}
          </form>
        </div>
      </>
    )
  }
}

const mapState = (state) => ({
  routine: state.routineReducer
});

const mapDispatch = (dispatch) => ({
  createActivity: (activity) => dispatch(createActivity(activity)),
});

export default withRouter(connect(mapState, mapDispatch)(AddActivity));
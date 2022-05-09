import React, {useEffect, useState} from 'react'
import { useDispatch } from "react-redux";
import { createActivity, deleteActivity } from "../store/activities";
import { withRouter } from 'react-router'

const activities = ["read", "prep for tomorrow", "tend to plants", 
                  "meditate", "listen to music", "stretch"]

const AddActivity = () => {

  const dispatch = useDispatch()
  const [task, setTask] = useState()
  const [isChecked, setChecked] = useState(false)
  

  const handleChange = (evt) => {
    setTask({
      [evt.target.name]: evt.target.value
    })
    
  }


  const handleClick = (evt, activity) => {
    evt.preventDefault();
    if (!isChecked) {
      dispatch(createActivity({[evt.target.name]: activity}))
      setChecked(true)
      console.log("check add", isChecked)
    } else {
      dispatch(deleteActivity(activity.id))
      setChecked(false)
      console.log("check delete", isChecked)
    }
    
  }

  // const handleSubmit = (evt) => {
  //   evt.preventDefault();
  //   console.log(evt.target.value)
  //   dispatch(createActivity(task))
  // }

  return (
    <>
      <div className="routine">
        {activities.map((activity, index) => {
          return (
            <div className="routine-item"  key={index}>
              <button name="activityName" onClick={(evt) => handleClick(evt, activity)} value={activity}>🗸</button>
              <h1>{activity}</h1> 
            </div>
          )
        })}
      </div>
    </>
  )
}

export default AddActivity;

// const AddActivity = () => {

//   const handleChange = (evt) => {
//     this.setState({
//       [evt.target.name]: evt.target.value
//     });
//   }

//   const handleSubmit = (evt) => {
//     evt.preventDefault();
//     this.props.createActivity({ ...this.state })
//   }

//   return (
//     <>
//       <div>
        <form className="routine" >
          <div className="routine-item">
            <input type="checkbox" name="read" value="read" />    
            <label for="read">read</label>
          </div>
          <div className="routine-item">
            <input type="checkbox" name="prep" value="prep" />
            <label for="prep">prep for tomorrow</label>
          </div>
          <div className="routine-item">
            <input type="checkbox" name="plants" value="plants" />
            <label for="plants">tend to plants</label> 
          </div>
          <div className="routine-item">
            <input type="checkbox" name="meditate" value="meditate" />
            <label for="meditate">meditate</label>  
          </div>
          <div className="routine-item">
            <input type="checkbox" name="music" value="music" />
            <label for="music">listen to music</label>
          </div>

          <div className="routine-item">
            <input type="checkbox" name="stretch" value="stretch" />
            <label for="stretch">stretch</label>
          </div>
          <div className="container">
            <button type="submit">Create Routine</button>
          </div>
//         </form>
//       </div>
//     </>
//   )
// }

// export default AddActivity;


//>>>>>>>>>>************************************

// class AddActivity extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       activityName: "",
//       duration: ""
//     };
//     this.handleChange = this.handleChange.bind(this)
//     this.handleSubmit = this.handleSubmit.bind(this)
//   }

//   handleChange(evt) {
//     this.setState({
//       [evt.target.name]: evt.target.value
//     });
//   }

//   handleSubmit(evt) {
//     evt.preventDefault();
//     this.props.createActivity({ ...this.state })
//   }

//   render() {
//     const { activityName, duration } = this.state;
//     const { handleSubmit, handleChange } = this;

//     return (
//       <>
//         <div>
//           <form  className="routine" name="add-activity" onSubmit={handleSubmit}>
//             <div>
//               <input placeholder="Enter Activity" type="text" name="activityName" onChange={handleChange} value={activityName} />
//             </div>
//             <div>
//               <input placeholder="Enter Time" name="duration" type="text" onChange={handleChange} value={duration} />
//             </div>
//             <div className="container">
//               <button type="submit">Add</button>
//             </div>
//             {/* {error && error.response && <h4 style={{display: 'flex', justifyContent: 'center'}}> {error.response.data} </h4>} */}
//           </form>
//         </div>
//       </>
//     )
//   }
// }

// const mapState = (state) => ({
//   routine: state.routineReducer
// });

// const mapDispatch = (dispatch) => ({
//   createActivity: (activity) => dispatch(createActivity(activity)),
// });

// export default withRouter(connect(mapState, mapDispatch)(AddActivity));
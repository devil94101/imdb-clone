import React, { useState, useReducer } from "react";

import axios from "axios";
import { connect } from "react-redux";
import { setActors } from "../../redux/movieDetail/movieAciton";
import DatePicker from "react-date-picker";

function reducer(state, { field, value }) {
  return {
    ...state,
    [field]: value
  };
}
function EditMovie(props) {
  const iniState = {
    name: "",
    gender: "male",
    bio: ""
  };
  const handleInput = (e) => {
    setState({ field: e.target.name, value: e.target.value });
  };
  const [state, setState] = useReducer(reducer, iniState);
  const [date, setDate] = useState(new Date());
  const submit = () => {
    axios.post('http://localhost:5000/movie/addActor',{
      name:state.name,
      gender:state.gender,
      bio:state.bio,
      dob:date
      
    }).then(res=>{
      console.log(res.data.name)
      alert("actor added")
      props.setActors({
        actors:[res.data.name]
      })
    }).catch(err=>{
      console.log(err.message)
    }    )
  };
  const validate = () => {
    if (state.name === "") {
      alert("name should not be empty");
    } else if (state.bio === "") {
      alert("bio should not be empty");
    } else {
      submit();
    }
  };
  return (
    <div className="col-md-4">
      <p onClick={() => props.SetAdd("director")}>+Click To Add New Director</p>
      <div className="form-group">
        <label>Full Actor Name</label>
        <input
          type="text"
          name="name"
          onChange={handleInput}
          className="form-control"
          value={state.name}
          placeholder="Actor Name"
        />
      </div>
      <div className="form-group">
        <div className="form-check form-check-inline">
          <input
            style={{
              transform: "scale(1.5)"
            }}
            type="radio"
            value="male"
            name="gender"
            onChange={handleInput}
            checked={state.gender === "male"}
          />
          <label
            className="form-check-label"
            style={{
              fontSize: "20px",
              marginLeft: "5px"
            }}
          >
            Male
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            style={{
              transform: "scale(1.5)"
            }}
            type="radio"
            value="female"
            onChange={handleInput}
            checked={state.gender === "female"}
            name="gender"
          />
          <label
            className="form-check-label"
            style={{
              fontSize: "20px",
              marginLeft: "5px"
            }}
          >
            Female
          </label>
        </div>
      </div>
      <div className="form-group">
        <label>DOB</label>
        <div>
          {" "}
          <DatePicker onChange={(value) => setDate(value)} value={date} />
        </div>
        <div className="form-group">
          <label>Bio</label>
          <textarea
            type="text"
            name="bio"
            value={state.bio}
            onChange={handleInput}
            className="form-control"
            placeholder="Actor Bio"
          />
        </div>
        <div className="form-group">
          <button className="btn btn-primary " onClick={validate}>
            Submit{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    actors: state.movie.actors
  };
};
const mapDispatch = (dispatch) => {
  return {
    setActors: (data) => {
      dispatch(setActors(data));
    }
  };
};
export default connect(mapStateToProps, mapDispatch)(EditMovie);

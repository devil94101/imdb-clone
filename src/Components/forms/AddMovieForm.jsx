import React, { useState, useEffect, useReducer } from "react";

import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { connect } from "react-redux";
import { setActors } from "../../redux/movieDetail/movieAciton";
import DatePicker from "react-date-picker";
import {setDirectors} from '../../redux/movieDetail/movieAciton'
 function reducer(state, { field, value }) {
  return {
    ...state,
    [field]: value
  };
}
function Movie(props) {
  const iniState = {
    name: '',
    plot: '',
    poster: ''
  };
  const [actors, setActors] = useState([]);
  const [state, setState] = useReducer(reducer, iniState);
  const [director, setDirector] = useState('');
  const [allActors, setAllActors] = useState([...props.actors]);
  const [allDirectors, setAllDirectors] = useState([
    ...props.directors
  ]);
  const [load, setLoad] = useState(true);
  const [date, setDate] = useState(new Date());
  const submit = () => {
    axios
      .post("http://localhost:5000/movie/addMovie", {
        name: state.name,
        director: director,
        poster: state.poster,
        actors,
        plot: state.plot,
        release: date.toDateString()
      })
      .then((res) => {
        console.log(res.data);
        alert("movie added to db")
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleInput = (e) => {
    setState({ field: e.target.name, value: e.target.value });
  };
  const validate = () => {
    if (state.name === "") {
      alert("Title should not be empty");
    } else if (state.plot === "") {
      alert("plot should not be empty");
    } else if (!director) {
      alert("director should not be empty");
    } else if (actors.length === 0) {
      alert("actor is required");
    } else {
      submit();
    }
  };
  useEffect(()=>{
    if(load&&props.actors.length===0&&props.directors.length===0){
      axios.get('http://localhost:5000/movie/actors').then(res=>{
      
        setAllActors([...allActors,...res.data.actors])
        setAllDirectors([...allDirectors,...res.data.directors])
        props.setActors({
          actors:res.data.actors
        })
        props.setDirectors({
          directors:res.data.directors
        })
        setLoad(false)
      }).catch(err=>{
        console.log(err)
        alert("network error")
      })
    }
    else{
      setLoad(false)
    }
  },[load])
  useEffect(()=>{
    setAllActors(props.actors)
    // console.log(props.actors)
  },[props.actors])
  useEffect(()=>{
    setAllDirectors(props.directors)
    // console.log(props.actors)
  },[props.directors])
  // console.log(props)
  if (load) {
    return <h2>Loading Data ...</h2>;
  } else {
    return (
      <div className="col-md-4">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="name"
            required
            className="form-control"
            value={state.name}
            onChange={handleInput}
            placeholder="Movie Name"
          />
        </div>
        <div className="form-group">
          <label>Actors</label>
          <Autocomplete
            multiple
            id="tags-filled"
            options={allActors}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  variant="outlined"
                  label={option}
                  {...getTagProps({ index })}
                />
              ))
            }
            required
            defaultValue={actors}
            onChange={(e, v) => {
              setActors(v);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="filled"
                label="list of actors"
                placeholder="Add Actor"
              />
            )}
          />
        </div>
        <div className="form-group">
          <label>Director</label>
          <Autocomplete
            onChange={(e, v) => {
              setDirector(v);
            }}
            required
            defaultValue={director}
            options={allDirectors}
            renderInput={(params) => (
              <TextField {...params} label="Director" variant="outlined" />
            )}
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Plot</label>
          <textarea
            className="form-control"
            name="plot"
            cols="50"
            rows="10"
            value={state.plot}
            onChange={handleInput}
          ></textarea>
        </div>

        <div className="form-group">
          <label>Released</label>
          <div>
            {" "}
            <DatePicker onChange={(value) => setDate(value)} value={date} />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="">Poster</label>
          <div>
            <img src={state.poster} alt={state.name} height="100" width="100" />
          </div>
          <div>
            <input
              className="form-control"
              type="text"
              name="poster"
              value={state.poster}
              onChange={setState}
              placeholder="image url"
            />
          </div>
        </div>
        <button onClick={validate} className="btn btn-primary">
          Submit
        </button>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    id: state.movie.id,
    data: state.movie.detail,
    actors: state.movie.actors,
    directors:state.movie.directors
  };
};
const mapDispatch = (dispatch) => {
  return {
    setActors: (data) => {
      dispatch(setActors(data));
    },
    setDirectors:(data)=>{
      dispatch(setDirectors(data))
    }
  };
};
export default connect(mapStateToProps, mapDispatch)(Movie);

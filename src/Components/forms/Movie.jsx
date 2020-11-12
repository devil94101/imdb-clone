import React,{useState,useEffect,useReducer} from "react";

import axios from 'axios'
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { connect } from "react-redux";
import { setMovie } from "../../redux/movieDetail/movieAciton";
import DatePicker from 'react-date-picker'
const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
  { title: 'The Good, the Bad and the Ugly', year: 1966 }
]
const iniState = {
  name:"",
  date:new Date(),
  plot:""
};
function reducer(state, { field, value }) {
  return {
    ...state,
    [field]: value
  };
}
function Movie(props) {
  const [actors,setActors]=useState([])
  const [file,setFile]=useState(null)
  const [state,setState]=useReducer(reducer,iniState)
  const [director,setDirector]=useState('')
  const submit=()=>{
    let formData=new FormData()
    formData.append('name',state.name)
    formData.append('director',director)
    formData.append('poster',file)
    formData.append('actors',actors)
    formData.append('release',state.date)
    formData.append('plot',state.plot)
    const options={

    }
    axios.post('http://localhost:5000/movie/addMovie',formData).then(res=>{
      console.log(res.data)
    }).catch(err=>{
      console.log(err.message)
    })
  }
  const handleInput = (e) => {
    setState({ field: e.target.name, value: e.target.value });
  };
  // console.log(state.plot)
  return (
      <div className="col-md-4">
        <div className="form-group">
      <label >Title</label>
      <input type="text" name="name" className="form-control" value={state.name} onChange={handleInput} placeholder="Movie Name"/>
     
    </div>
    <div className="form-group">
    <label >Actors</label>
      <Autocomplete
        multiple
        id="tags-filled"
        options={top100Films.map((option) => option.title)}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
          ))
        }
        defaultValue={[]}
        onChange={(e,v)=>{
          setActors(v)
        }}
        renderInput={(params) => (
          <TextField {...params} variant="filled" label="list of actors" placeholder="Favorites" />
        )}
      /></div>
      <div className="form-group">
      <label >Director</label>
      <Autocomplete
       onInputChange={(e,v)=>{
         setDirector(v)
       }}
       options={top100Films.map((option) => option.title)}
       renderInput={(params) => <TextField {...params} label="Director" variant="outlined" />}
     />
    </div>
    <div className="form-group">
      <label htmlFor="">Poster</label>
      <textarea name="plot" cols="50" rows="10" value={state.plot} onChange={handleInput}></textarea>
       </div>

    <div className="form-group">
      <label >Released</label>
      <div> <DatePicker
        onChange={(value)=>setState({date:value})}
        value={state.date}
    /></div>
    </div>
    <div className="form-group">
      <label htmlFor="">Poster</label>
      <input type="file" onChange={(e)=>setFile(e.target.files[0])}/>
    </div>
    <button onClick={submit} className="btn btn-primary">Submit</button>
        </div>
        
  );
}
const mapStateToProps = (state) => {
  return {
    id:state.movie.id,
    data:state.movie.data
  };
};
const mapDispatch = (dispatch) => {
  return {
    setMovie:(data)=>{dispatch(setMovie(data))}
  };
};
export default connect(mapStateToProps, mapDispatch)(Movie)
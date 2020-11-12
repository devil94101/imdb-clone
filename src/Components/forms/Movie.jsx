import React,{useState,useEffect} from "react";

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
function Movie(props) {

  const [actors,setActors]=useState([])
  return (
      <div className="col-md-4">
        <div className="form-group">
      <label >Title</label>
      <input type="text" className="form-control" placeholder="Movie Name"/>
     
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
          console.log()
        }}
        renderInput={(params) => (
          <TextField {...params} variant="filled" label="list of actors" placeholder="Favorites" />
        )}
      /></div>
      <div className="form-group">
      <label >Director</label>
      <input type="text" className="form-control" placeholder="Director Name"/>
     
    </div>
    <div className="form-group">
      <label >Released</label>
      <div> <DatePicker
        // onChange={(value)=>this.setState({date:value})}
        // value={this.state.date}
    /></div>
    </div>
    <button type="submit" className="btn btn-primary">Submit</button>
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

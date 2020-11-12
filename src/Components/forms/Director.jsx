import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
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
function EditMovie(props) {
 
  return (
        <div className="col-md-4">
            <div className="form-group">
          <label >Name</label>
          <input type="text" className="form-control" placeholder="Actor Name"/>
          
        </div>
        <div className="form-group">
          <div  className="form-check form-check-inline" >
              
              <input style={{
                  transform:'scale(1.5)'
              }} type="radio" value="male" name="gender" /> 
          <label className="form-check-label" style={{
              fontSize:"20px",
              marginLeft:"5px"
          }}>Male</label>
          </div>
          <div className="form-check form-check-inline">
              <input style={{
                  transform:'scale(1.5)'
              }} type="radio" value="female" name="gender" />
              <label className="form-check-label" style={{
              fontSize:"20px",
              marginLeft:"5px"
          }} >Female</label></div>
          </div>
          <div className="form-group">
          <label >DOB</label>
          <div> <DatePicker
            // onChange={(value)=>this.setState({date:value})}
            // value={this.state.date}
        /></div>
    </div>
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
export default connect(mapStateToProps, mapDispatch)(EditMovie)

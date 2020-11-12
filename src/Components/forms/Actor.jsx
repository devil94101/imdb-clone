import React,{useState,useEffect} from "react";

import axios from 'axios'
import { connect } from "react-redux";
import { setMovie } from "../../redux/movieDetail/movieAciton";
import DatePicker from 'react-date-picker'

function EditMovie(props) {
 
  console.log(props)
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

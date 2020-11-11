import React,{useState,useEffect} from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { setSearch } from "../../redux/list/listAction";
import {read_cookie,delete_cookie,bake_cookie} from 'sfcookies'
import axios from 'axios'
function MovieList(props) {

  const [login,setlogin]=useState(read_cookie('token').length>0?true:false)
  const logout=()=>{
    delete_cookie('token');
    setlogin(false)
}

useEffect(()=>{
  if(login===true){
    axios.get('http://localhost:5000/api/auth',{
      headers:{
        'x-auth-token':read_cookie('token')
      }
    }).then(res=>{
        if(res.data.err){
          setlogin(false)
          bake_cookie('token','')
        }
    }).catch(err=>{
      console.log(err.message)
       setlogin(false)
    })
  }
},[login])
console.log(read_cookie('token'))
  return (

    <div>
      {!login? <Redirect to="/login" /> : null}
      Home Screen
      <button
        onClick={logout
        }
      >
        Logout
      </button>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    search:state.list.search,
    data:state.list.data
  };
};
const mapDispatch = (dispatch) => {
  return {
    setSearch:(data)=>{dispatch(setSearch(data))}
  };
};

export default connect(mapStateToProps, mapDispatch)(MovieList);

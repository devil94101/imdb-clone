import React,{useState,useEffect} from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { setUser } from "../../redux/user/userAction";
import {read_cookie,delete_cookie,bake_cookie} from 'sfcookies'
import axios from 'axios'
function SetUser(props) {

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
    userName: state.user.user,
    token: state.user.token
  };
};
const mapDispatch = (dispatch) => {
  return {
    setUser: (user) => dispatch(setUser(user))
  };
};

export default connect(mapStateToProps, mapDispatch)(SetUser);

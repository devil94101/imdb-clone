import React, { useReducer,useState } from "react";
import { Redirect, Link } from "react-router-dom";

import {bake_cookie,read_cookie} from 'sfcookies'
import axios from 'axios'
import "./style.css";

const iniState = {
  name: "",
  email: "",
  password: "",
  password2: ""
};
function reducer(state, { field, value }) {
  return {
    ...state,
    [field]: value
  };
}
function Signup(props) {
  const [state, setState] = useReducer(reducer, iniState);
  const [login,setlogin]=useState(read_cookie('token').length>0?true:false)
  const handleInput = (e) => {
    setState({ field: e.target.name, value: e.target.value });
  };
 
  const submit = (e) => {
    e.preventDefault();
    if(state.password===state.password2){
      axios.post('http://localhost:5000/api/register',{
        name:state.name,
      email:state.email,
      password:state.password
      }).then(res=>{
        if(res.data.err){
          alert(res.data.msg)
        }
        else{
          bake_cookie('token',res.data.token)
          setlogin(true)
        }
      }).catch(err=>{
        console.log(err.message)
      })
    }
  };
  return (
    <div>
      {login ? <Redirect to="/" /> : null}
      <h1>SignUp Page</h1>
      <main>
        <form onSubmit={submit}>
          <ul>
            <li>
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                value={state.name}
                required
                name="name"
                onChange={handleInput}
              />
            </li>
            <li>
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                value={state.email}
                required
                name="email"
                onChange={handleInput}
              />
            </li>
            <li>
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                value={state.password}
                required
                name="password"
                onChange={handleInput}
              />
            </li>
            <li>
              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control"
                value={state.password2}
                required
                name="password2"
                onChange={handleInput}
              />
            </li>
            <li>
              <button className="btn btn-primary" type="submit">
                SignUp
              </button>
            </li>
          </ul>
        </form>
        <div>
          <p>
            Already have an Account ?{" "}
            <span>
              <Link to="/login">Login</Link>
            </span>
          </p>
        </div>
      </main>
    </div>
  );
}

export default Signup;

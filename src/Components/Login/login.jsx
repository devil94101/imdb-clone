import React, { useReducer,useState} from "react";
import { Redirect, Link } from "react-router-dom";
import axios from 'axios'
import {bake_cookie,read_cookie} from 'sfcookies'
import "./style.css";

const iniState = {
  email: "",
  password: ""
};
function reducer(state, { field, value }) {
  return {
    ...state,
    [field]: value
  };
}
function Login(props) {
  const [state, setState] = useReducer(reducer, iniState);
  const [login,setlogin]=useState(read_cookie('token').length>0?true:false)
  const handleInput = (e) => {
    setState({ field: e.target.name, value: e.target.value });
  };
  const submit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/login',{
      email:state.email,
      password:state.password
      }).then(res=>{
        if(res.data.err){
          alert(res.data.msg);
        }
        else{
          bake_cookie('token',res.data.token)
          setlogin(true)
        }
      }).catch(err=>{
        console.log(err.message)
      })
  };
  return (
    <div>
      {login ? <Redirect to="/" /> : null}
      <h1>Login Please</h1>
      <main>
        <form onSubmit={submit}>
          <ul className="form">
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
              <button className="btn btn-primary" type="submit">
                Login
              </button>
            </li>
          </ul>
        </form>
        <div className="kya">
          <p>
            Dont have an Account ?{" "}
            <span>
              <Link to="/signup">SignUp</Link>
            </span>
          </p>
        </div>
      </main>
    </div>
  );
}

export default Login

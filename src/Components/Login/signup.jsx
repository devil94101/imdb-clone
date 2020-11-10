import React, { useReducer } from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { setUser } from "../../redux/user/userAction";
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
  const handleInput = (e) => {
    setState({ field: e.target.name, value: e.target.value });
  };
  console.log(props);
  const submit = (e) => {
    props.setUser({
      name: "deepak",
      token: "agikdbjsh4865"
    });
    e.preventDefault();
  };
  return (
    <div>
      {props.token ? <Redirect to="/" /> : null}
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

const mapStateToProps = (state) => {
  return {
    token: state.user.token
  };
};
const mapDispatch = (dispatch) => {
  return {
    setUser: (user) => dispatch(setUser(user))
  };
};
export default connect(mapStateToProps, mapDispatch)(Signup);

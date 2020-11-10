import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { setUser } from "../../redux/user/userAction";
function SetUser(props) {
  console.log(props);
  return (

    <div>
      {!props.token ? <Redirect to="/login" /> : null}
      Home Screen
      <button
        onClick={() =>
          props.setUser({
            name: "",
            token: null
          })
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

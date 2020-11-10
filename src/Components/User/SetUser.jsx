import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { setUser } from "../../redux/user/userAction";
import {read_cookie,delete_cookie} from 'sfcookies'
function SetUser(props) {
  console.log(read_cookie("token").length);
  const logout=()=>{
    delete_cookie('token');
}

  return (

    <div>
      {read_cookie('token').length>0? <Redirect to="/login" /> : null}
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

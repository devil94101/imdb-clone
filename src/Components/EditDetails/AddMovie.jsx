import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import { read_cookie, delete_cookie, bake_cookie } from "sfcookies";
import axios from "axios";
import MovieForm from "../forms/AddMovieForm";
import ActorForm from "../forms/Actor";
import DirectorForm from '../forms/Director'
function AddMovie(props) {
  const [login, setlogin] = useState(
    read_cookie("token").length > 0 ? true : false
  );
  const [actors, setActors] = useState([]);
  const [add, SetAdd] = useState("");
  const logout = () => {
    delete_cookie("token");
    setlogin(false);
  };

  useEffect(() => {
    if (login === true) {
      axios
        .get("http://localhost:5000/api/auth", {
          headers: {
            "x-auth-token": read_cookie("token")
          }
        })
        .then((res) => {
          if (res.data.err) {
            setlogin(false);
            bake_cookie("token", "");
          }
        })
        .catch((err) => {
          console.log(err.message);
          setlogin(false);
        });
    }
  }, [login]);

  return (
    <div>
      {/* {!login? <Redirect to="/login" /> : null} */}
      <header>
        <nav className="navbar navbar-inverse navbar-fixed-top navcustom">
          <div className="container">
            <div className="navbar-header">
              <Link to="/" className="navbar-brand">
                <i className="fa fa-home" aria-hidden="true"></i> Movie Search
                Application{" "}
              </Link>
            </div>
            <div>
              <button className="btn btn-danger" onClick={logout}>
                Logout
              </button>
            </div>
          </div>
        </nav>
      </header>
      <main
        style={{
          marginTop: "40px"
        }}
        className="d-flex justify-content-around"
      >
        <MovieForm />
        {add === "" && (
          <div>
            {" "}
            <p onClick={() => SetAdd("actor")}>+Add New Actor</p>
            <p onClick={() => SetAdd("director")}>+Add New Director</p>
          </div>
        )}

        {add == "actor" && <ActorForm SetAdd={SetAdd} />}
        {add == "director" && <DirectorForm SetAdd={SetAdd} />}
      </main>
    </div>
  );
}

export default AddMovie;

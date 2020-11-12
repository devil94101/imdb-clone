import React,{useState,useEffect} from "react";
import { Redirect,Link } from "react-router-dom";
import {read_cookie,delete_cookie,bake_cookie} from 'sfcookies'
import axios from 'axios'
import { connect } from "react-redux";
import { setMovie } from "../../redux/movieDetail/movieAciton";
function MovieDetail(props) {


  const [login,setlogin]=useState(read_cookie('token').length>0?true:false)
  const [data,setData]=useState([])
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
console.log(props)
 useEffect(()=>{
   if(data.length===0){
    axios.get('http://localhost:5000/api/detail/'+props.match.params.id).then(res=>{
        console.log(res.data)
        setData(res.data)
        props.setMovie({
          id:props.match.params.id,
          data:res.data
        })
    }).catch(err=>{
      console.log(err.message)
    })
  }
 },[data])
  return (
    <div>
      {/* {!login? <Redirect to="/login" /> : null} */}
     <header>
     <nav className="navbar navbar-inverse navbar-fixed-top navcustom">
            <div className="container">
                  
                    <div className="navbar-header">
                        <Link to="/" className="navbar-brand"><i className="fa fa-home" aria-hidden="true"></i> Movie Search Application </Link>
                    </div>
                    <div><Link to={"/edit/"+props.match.params.id} >Edit Movie</Link></div>
                    <div><button className="btn btn-danger" onClick={logout}>Logout</button></div>
            </div>
            </nav>
     </header>
     <main>
    {data.Title&&(<div className="container">
      <div className="row flex">
       <div className="col-lg-4 col-sm-6">
                <div className="thumbnail img-responsive">
                    <img src={data.Poster} alt={data.Title}/>
                </div>
          </div>
          <div className="col-lg-8 col-sm-6">
                <div className="movie_data">
                    <h3> {data["Title"]}</h3>
                   <p> <strong> Duration: </strong>{data["Runtime"]} </p>
                   <p> <strong> Genre: </strong>{data["Genre"]} </p>
                   <p> <strong> IMDB Rating: </strong>{data["imdbRating"]}</p>
                   <p> <strong> IMDB Votes: </strong>{data["imdbVotes"]}</p>
                   <p><strong> Cast: </strong> {data["Actors"]}</p>
                   <p><strong> Plot: </strong> {data["Plot"]}</p>
                </div>
               
            </div>
      </div>
    </div>)}
       </main>
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
export default connect(mapStateToProps, mapDispatch)(MovieDetail)

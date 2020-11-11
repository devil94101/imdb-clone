import React,{useState,useEffect} from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { setSearch } from "../../redux/list/listAction";
import {read_cookie,delete_cookie,bake_cookie} from 'sfcookies'
import axios from 'axios'
function MovieList(props) {

  const [login,setlogin]=useState(read_cookie('token').length>0?true:false)
  const [search,setSearch]=useState("")
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
 const submit=(e)=>{
    e.preventDefault()
  axios.get('http://localhost:5000/api/search/'+search,{
    headers:{
      'x-auth-token':read_cookie('token')
    }
  }).then(res=>{
    console.log(res.data)
    props.setSearch({
      search,
      data:res.data.Search
    })
  }).catch(err=>{
    console.log(err.message)
  })
   
  }
  return (
    <div>
      {/* {!login? <Redirect to="/login" /> : null} */}
     <header>
     <nav className="navbar navbar-inverse navbar-fixed-top navcustom">
            <div className="container">
                  
                    <div className="navbar-header">
                        
                    
                        <a href="/" className="navbar-brand"><i className="fa fa-home" aria-hidden="true"></i> Movie Search Application </a>
                    </div>
                <div className="collapse navbar-collapse" id="bs-nav-bar1">
                    
                    <ul className="nav navbar-nav">
                       <li><a href="aboutme.html" title=""> About</a> </li>
                        <li><a href="projects.html" title=""> Projects</a> </li>
                      
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                      <li><a href="contactme.html" title=""><span className="glyphicon glyphicon-envelope"></span> Contact</a></li>
                    </ul>
                </div>
            </div>
            </nav>
     </header>
     <main>
     <div className="container">
    <div className="jumbotron">
        <form className="form-inline" onSubmit={submit}>
            <div className="form-group">
                <label >Movie Name:</label>
                <input type="text" className="form-control" value={search===""?props.search:search} onChange={(e)=>setSearch(e.target.value)} name="search"/>
            </div> 

            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
</div>
<div className="row flex">
      {props.data.map((ele,i)=>{
           return(<div key={i} className="col-lg-4 col-sm-6">
           <div className="thumbnail img-responsive">
               <a href={"/search/:"+ele.imdbID}> <img src={ele.Poster} className="searched_images" alt={ele.Title}/>
               <div className="caption" align="center">
                   <p>{ele.Title}</p>
               </div>
               </a>
           </div>
           </div>)
      
      })}
      </div>
       </main>
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

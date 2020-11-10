import React, { Component } from 'react'
import {buyBook} from '../redux/index'
import {connect} from 'react-redux'
const mapStateToProps=(state)=>{
    return{
        numOfBooks:state.numOfBooks
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        buyBook:function(){
            dispatch(buyBook());
        }
    }
}
export class BookContainer extends Component {
    constructor(props){
        super(props);
    }
    
    render() {
        
        // console.log(this.props)
        return (
            <div>
                Book Container
                <button onClick={this.props.buyBook}>Buy Book</button>
                <h1>{this.props.numOfBooks}</h1>
            </div>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)( BookContainer)

import {BUY_BOOK} from './BookType'
const initialState={
    numOfBooks:20
}

export const bookReducer=(state=initialState,action)=>{
    switch(action.type){
        case BUY_BOOK:
            return{
                numOfBooks:state.numOfBooks-1
            }
        default:return state
    }
}

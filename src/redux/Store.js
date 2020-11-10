import {createStore} from 'redux'
import {bookReducer} from './Book/BookReducer'

export const store=createStore(bookReducer)


import React from 'react';
import BookContainer from './Components/BookContainer'
import { Provider} from 'react-redux'
import {store} from './redux/Store'

import './App.css'
function App() {
  return (
    <Provider store={store}>
    <div className="App">
     <BookContainer/>
    </div>
    </Provider>
  );
}

export default App;

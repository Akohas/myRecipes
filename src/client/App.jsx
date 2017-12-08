// @flow

import React from 'react';
import {
  Provider
} from 'react-redux'

import Header from './components/Header'
import store from './redux/store.js'

function App() {
  return (
    < Provider store = {store}> 
      <div>
        <Header/>
      </div>
    </Provider>
  )
}

export default App;

// @flow
import React, { Component } from 'react'
import { Provider } from 'react-redux';  

import { connect } from 'react-redux'

import { Move, Tick } from './redux/actions'
import { store } from './redux/redux'

import Map from './components/Map'

const mapStateToProps = (state, ownProps) => ({  
  map: state,
});

const mapDispatchToProps = { 
  move: Move,
  tick: Tick,
};

const MapContainer = connect(  
  mapStateToProps,
  mapDispatchToProps
)(Map);

export const App = () => (<Provider store={store}>
    <MapContainer />
  </Provider>)
export default App;

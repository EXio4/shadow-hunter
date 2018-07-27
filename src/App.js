// @flow
import React, { Component } from 'react'
import { Provider } from 'react-redux';  

import { connect } from 'react-redux'

import { Move, Tick, StartGame } from './redux/actions'
import { store } from './redux/redux'

import Game from './components/Game'

const mapStateToProps = (state, ownProps) => ({
  st: state
});

const mapDispatchToProps = {
    acts: { 
        move: Move,
        tick: Tick,
        start: StartGame,
    } 
};

const GameContainer = connect(  
  mapStateToProps,
  mapDispatchToProps
)(Game);

export const App = () => (<Provider store={store}>
    <GameContainer />
  </Provider>)
export default App;

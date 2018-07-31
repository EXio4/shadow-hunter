// @flow
import React from 'react'
import { Provider } from 'react-redux';  

import { connect } from 'react-redux'

import { Move, Tick, StartGame } from './redux/actions'
import { store } from './redux/redux'
import type { GState } from './types'
import Game from './components/Game'

const mapStateToProps = (state: GState, ownProps): { st: GState } => ({
  st: state
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    acts: { 
        move: (x: number, y: number) => dispatch(Move(x,y)),
        tick: () => dispatch(Tick()),
        start: (size: number, seed?: string) => dispatch(StartGame(size, seed)),
    } 
});

const GameContainer = connect(  
  mapStateToProps,
  mapDispatchToProps
)(Game);

export const App = () => (<Provider store={store}>
    <GameContainer />
  </Provider>)
export default App;

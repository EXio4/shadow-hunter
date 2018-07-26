// @flow

import React from 'react'
import './styles.css'
import type { GameMap } from '../logic/Game'

let player = {
    'transform': 'rotateZ(-45deg) scale3d(1, 2, 1) translate3d(0, -10px, 0px)',
    'imageRendering': 'pixelated',
}

export const Player = (props: GameMap) => {
  return (<div style={player} className="idle" />)
}



export default Player

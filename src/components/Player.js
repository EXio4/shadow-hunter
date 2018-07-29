// @flow

import React from 'react'
import './styles.css'
import type { GameMap } from '../logic/Game'

export const Player = (props: { map: GameMap }) => {
  return (<div className={ props.map.dead ? "dead player" : "idle player" } />)
}



export default Player

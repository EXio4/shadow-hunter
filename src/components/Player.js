// @flow

import React from 'react'
import './styles.css'
import type { GameMap } from '../logic/Game'
import StaticSprite from "../render/StaticSprite"
import player from '../assets/player.png'

let coeff = 1/1024

let player_off = {
  start: [16 * coeff, 24 * coeff],
  end: [(16+32) * coeff, (24+32) * coeff],
}

export const Player = (props: { map: GameMap }) => {
  let pos = props.map.playerPos
  console.log(pos.x, pos.y)
  return (
    <StaticSprite pos={[pos.x, 10, pos.y]} size={[2, 2]} texture={player} spriteOffset={player_off} />
  )
}



export default Player

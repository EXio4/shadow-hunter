// @flow

import React from 'react'
import ArrowKeysReact from 'arrow-keys-react'
import Tile from './Tile'

import type { GameMap } from '../logic/Game'
import { getNearby } from '../logic/Game'
import type { Action } from '../redux/actions'

import idle_cat from '../assets/idle_cat.png'
import './styles.css'

export type MapProps = {
  map: GameMap,
  move: (number, number) => Action
}

let style = {
  'position': 'absolute',
  'left': '20vw',
  'margin': '0 auto',
  'backgroundColor': '#333'
}

export const Map = (props: MapProps) => {

  let around = getNearby(props.map, 10)

  ArrowKeysReact.config({
    left: () => {
      props.move(-1, 0)
    },
    right: () => {
      props.move(1, 0)
    },
    up: () => {
      props.move(0, -1)
    },
    down: () => {
      props.move(0, 1)
    }
  });

  return (<div  {...ArrowKeysReact.events} tabIndex="1" style={style}>
    {around.map((row, x) =>  
      row.map((tile, y) => (
        <Tile {...tile} pos={[x,y]} key={x * 1024 + y} important={x === 10 && y === 10}>
          {
            (x === 10 && y === 10) ? <img className="idle" /> : null
          }
        </Tile>
      ))
    )}
  </div>)

}

export default Map
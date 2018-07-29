// @flow

import React from 'react'
import type { Node } from 'react'

import type { TileID, Powerup } from '../logic/Tiles'

export type TileProps = {
  children?: Node,
  tileId: TileID,
  important?: boolean,
  powerup?: Powerup,
  height: number,
  visible: boolean,
  pos: [number, number]
}

const fromPowerup = (powerup?: Powerup): Node => {
    if (powerup == null) return null
    if (powerup.type === 'health') {
        return (<div className="gem pink-2" />)
    }
    if (powerup.type === 'shield') {
        return (<div className="gem pink-6" />)
    }
    if (powerup.type === 'xp') {
        return (<div className="gem green-1" />)
    }
}

const obtainColor = ({ tileId, visible }: TileProps) => {
  if (!visible) {
    return '#505060'
  }

  let colors = new Map()

  colors.set('grass', '#98dd00')
  colors.set('water', '#00ddca')
  colors.set('sand' , '#c2b280')
  colors.set('dirt' , '#bb8b00')
  colors.set('stone', '#8d8d8d')
  colors.set('ice'  , '#b9e8ea')
  colors.set('snow' , '#fffafa')
  colors.set('lava' , '#cf1020')
  colors.set('volcanic', '#3d3f3e')
  colors.set('void' , '#000000')

  return colors.get(tileId)
}

const obtainHeight = ({ tileId, height, visible }: TileProps) => {
  if (!visible) {
    return -2
  }
  return height
}


//rotateZ(-45deg) rotateY(-60deg)
const getStyle = (props: TileProps) => {
  let height = obtainHeight(props)
  let style = {
    'backgroundColor': obtainColor(props),
    'width': '32px',
    'height': '32px',
    'position': 'absolute',
    'left': '0',
    'top': '0',
    'zIndex': (1000+props.pos[0]+props.pos[1])*2,
    'transform': 'translate3d(' + (props.pos[0] * 32 - height) + 'px, ' + (props.pos[1] * 32 - height) + 'px, 0px) ',
  }
  return style
}


export const Tile = (props: TileProps) => (
  <div className={props.important ? 'glow' : 'none'} style={getStyle(props)}>
    {props.visible ? fromPowerup(props.powerup) : null}
    {props.children}
  </div>
)

export default Tile

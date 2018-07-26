// @flow

import React from 'react'
import type { Node } from 'react'

import { randomTile } from '../logic/Tiles';
import type { TileID } from '../logic/Tiles'

export type TileProps = {
  children?: Node,
  tileId: TileID,
  important?: boolean,
  height: number,
  visible: boolean,
  pos: [number, number]
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
    filter: undefined
  }
  if (props.important === true) {
    style['filter'] = 'contrast(100%)'
  }
  return style
}


export const Tile = (props: TileProps) => (
  <div style={getStyle(props)}>
    {props.children}
  </div>
)

export default Tile

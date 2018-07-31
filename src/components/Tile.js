// @flow

import React from 'react'
import type { Node } from 'react'

import Tile3D from '../render/Tile'

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

const obtainColor = ({ tileId, visible }: TileProps): number => {
  if (!visible) {
    return 0x505060
  }

  let colors = new Map()

  colors.set('grass', 0x98dd00)
  colors.set('water', 0x00ddca)
  colors.set('sand' , 0xc2b280)
  colors.set('desert-sand', 0xf4a460)
  colors.set('dirt' , 0xbb8b00)
  colors.set('stone', 0x8d8d8d)
  colors.set('ice'  , 0xb9e8ea)
  colors.set('snow' , 0xfffafa)
  colors.set('lava' , 0xcf1020)
  colors.set('volcanic', 0x3d3f3e)
  colors.set('void' , 0x000000)

  const val = colors.get(tileId)
  return val ? val : 0xff0000
}

const obtainHeight = ({ tileId, height, visible }: TileProps) => {
  if (!visible) {
    return -2
  }
  return height
}

export const Tile = (props: TileProps) => (
  props.visible ? (
    <Tile3D x={props.pos[0]} y={props.pos[1]}
      height={1} color={obtainColor(props)} />
  ): null
)
/*

{props.visible ? fromPowerup(props.powerup) : null}
{props.children}
*/
export default Tile

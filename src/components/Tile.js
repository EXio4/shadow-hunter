// @flow

import React from 'react'
import type { Node } from 'react'

import Tile3D from '../render/Tile'
import Material from '../render/Material'

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
let colors = new Map()

colors.set('grass', new Material(0x98dd00))
colors.set('water', new Material(0x00ddca))
colors.set('sand' , new Material(0xc2b280))
colors.set('desert-sand', new Material(0xf4a460))
colors.set('dirt' , new Material(0xbb8b00))
colors.set('stone', new Material(0x8d8d8d))
colors.set('ice'  , new Material(0xb9e8ea))
colors.set('snow' , new Material(0xfffafa))
colors.set('lava' , new Material(0xcf1020))
colors.set('volcanic', new Material(0x3d3f3e))
colors.set('void' , new Material(0x000000))

const obtainColor = ({ tileId, visible }: TileProps): Material => {
  if (!visible)
    return new Material(0x505060)

  
  const val = colors.get(tileId)
  return val ? val : new Material(0xff0000)
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
      height={obtainHeight(props)} material={obtainColor(props)} />
  ): null
)
/*

{props.visible ? fromPowerup(props.powerup) : null}
{props.children}
*/
export default Tile

// @flow

import React from 'react'
import type { Node } from 'react'

import Tile3D from '../render/Tile'
import Material from '../render/Material'

import type { TileID, Powerup } from '../logic/Tiles'
import text_snow from '../assets/blocks/snow.png'
import text_ice from '../assets/blocks/ice.png'
import text_water from '../assets/blocks/water.png'
import text_lava from '../assets/blocks/lava.png'
import text_grass from '../assets/blocks/grass.png'
import text_sand from '../assets/blocks/sand.png'
import text_desert_sand from '../assets/blocks/desert_sand.png'
import text_stone from '../assets/blocks/stone.png'

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

colors.set('grass', new Material({ color: 0x98dd00, texture: text_grass } ))
colors.set('water', new Material({ color: 0x00ddca, texture: text_water } ))
colors.set('sand' , new Material({ color: 0xc2b280, texture: text_sand } ))
colors.set('desert-sand', new Material({ color: 0xf4a460, texture: text_desert_sand }))
colors.set('dirt' , new Material(0xbb8b00))
colors.set('stone', new Material({ color: 0x8d8d8d, texture: text_stone }))
colors.set('ice'  , new Material({ color: 0xb9e8ea, texture: text_ice } ))
colors.set('snow' , new Material({ color: 0xfffafa, texture: text_snow } ))
colors.set('lava' , new Material({ color: 0xcf1020, texture: text_lava } ))
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

// @flow

import * as THREE from 'three'

import Ctx from './Context'
import Caching from './Caching'
import Object3D from './Object3D'
import SpriteCache from './SpriteCache'

import type { SpriteOffset } from './SpriteMaterial'
import { setMaterialOffset } from './SpriteMaterial'


export type StaticSpriteProps = {
  texture: string,
  pos: [number, number, number],
  size: [number, number],
  spriteOffset: SpriteOffset,
}

class StaticSprite extends Object3D<StaticSpriteProps> {

  init(props: StaticSpriteProps) {
    let spriteMaterial = SpriteCache.material(props.texture)
    let sprite = new THREE.Sprite( spriteMaterial )
    sprite.scale.set(props.size[0], 1, props.size[1])
    const pos = props.pos
    sprite.position.set(pos[0], pos[1], pos[2])
    return sprite
  }

  updateProps(oldProps: StaticSpriteProps, newProps: StaticSpriteProps) {
    if (oldProps.texture !== newProps.texture) {
    } else if (oldProps.pos !== newProps.pos) {

    } else if (oldProps.spriteOffset !== newProps.spriteOffset) {
      setMaterialOffset(this.obj, newProps.spriteOffset)
    }
  }
   
}
export default Ctx.with3D(StaticSprite)
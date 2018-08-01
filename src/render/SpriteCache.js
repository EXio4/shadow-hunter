// @flow

import * as THREE from 'three'
import { initCache } from './Caching'

var memoSpriteTexture: string => THREE.SpriteTexture = initCache(memoSpriteTexture_fn)
var memoSpriteMaterial: string => THREE.SpriteMaterial = initCache(memoSpriteMaterial_fn)

function memoSpriteTexture_fn(s: string): THREE.SpriteTexture {
  return new THREE.TextureLoader().load(s);
}

function memoSpriteMaterial_fn(s: string): THREE.SpriteMaterial {
  return new THREE.SpriteMaterial({
    color: 0xffffff,
    map: memoSpriteTexture(s)
  })
}

export default {
  texture: memoSpriteTexture,
  material: memoSpriteMaterial,
}
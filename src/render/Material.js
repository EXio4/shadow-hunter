// @flow

import * as THREE from 'three'

let textCache: { [string]: THREE.Texture } = {}

function getText(s: string) {
  if (!textCache[s]) {
    let texture = new THREE.TextureLoader().load(s);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 1, 1 );
    textCache[s] = texture
  }
  return textCache[s]
}

export type MaterialInfo = {
  color: number,
  texture?: string,
}

export class Material {

  color: number
  material: THREE.Material

  constructor(matInfo: MaterialInfo | number) {
    let text
    if (typeof matInfo === 'number') {
      this.color = matInfo 
    } else {
      this.color = matInfo.color
      text = matInfo.texture ? getText(matInfo.texture) : undefined
    }
    this.material = new THREE.MeshLambertMaterial( { color: this.color, side: THREE.DoubleSide, map: text })
  }

  updateInfo(matInfo: MaterialInfo) {
    if (this.color !== matInfo.color) {
      this.color = matInfo.color
      this.material.color.set(this.color)
    }
  }



}

export default Material


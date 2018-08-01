// @flow

import * as THREE from 'three'

export type MaterialInfo = {
  color: number
}

export class Material {

  color: number
  material: THREE.Material

  constructor(matInfo: MaterialInfo | number) {
    if (typeof matInfo === 'number') {
      this.color = matInfo 
    } else {
      this.color = matInfo.color
    }
    this.material = new THREE.MeshLambertMaterial( { color: this.color, side: THREE.DoubleSide })
  }

  updateInfo(matInfo: MaterialInfo) {
    if (this.color !== matInfo.color) {
      this.color = matInfo.color
      this.material.color.set(this.color)
    }
  }



}

export default Material


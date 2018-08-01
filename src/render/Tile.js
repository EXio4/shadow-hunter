// @flow
import * as THREE from 'three'

import Ctx from './Context'
import type { Material } from './Material'
import Object3D from './Object3D'

export type TileProps = {
  x: number,
  y: number,
  height: number,
  material: Material,
}

const geom = []

function getHeight(x: number) {
  if (!geom[x]) {
    geom[x] = new THREE.BoxGeometry( 1, 1, x/9 ) 
  }

  return geom[x]
}

//const geom = new THREE.PlaneGeometry(1, 1) 

class Tile extends Object3D<TileProps> {

  init(props: TileProps) {
    let cube = new THREE.Mesh(getHeight(props.height), props.material.material)
    cube.position.set(props.x, props.height/9 / 2, props.y);
    cube.rotation.x = Math.PI * -0.5
    return cube
  }

  updateProps(oldProps: TileProps, newProps: TileProps) {
    if (oldProps.height !== newProps.height) { 
      this.obj.position.setY(newProps.height/9 / 2)
      this.obj.geometry = getHeight(newProps.height)
    }
    if (oldProps.x !== newProps.x || oldProps.y !== newProps.y) {
      this.obj.position.setX(newProps.x)
      this.obj.position.setZ(newProps.y)
    }
  }
}

export default Ctx.with3D(Tile)
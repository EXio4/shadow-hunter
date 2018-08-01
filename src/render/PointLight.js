// @flow

import * as THREE from 'three'

import Ctx from './Context'
import Object3D from './Object3D'

export type PointLightProps = {
  color: number,
  distance: number,
  position:  [number, number, number]
}

class PointLight extends Object3D<PointLightProps> {

  init(props: PointLightProps) {
    let light = new THREE.PointLight(props.color, 1, props.distance, 2)
    const pos = props.position
    light.position.set(pos[0], pos[1], pos[2])
    return light
  }

  updateProps(oldProps: PointLightProps, newProps: PointLightProps) {
    if (oldProps.color !== newProps.color) {
      this.obj.color.set(newProps.color)
    }
    if (oldProps.distance !== newProps.distance) {
      this.obj.distance = newProps.distance
    }
    if (oldProps.position !== newProps.position) {
      const pos = newProps.position
      this.obj.position.set(pos[0], pos[1], pos[2])
    }
  }
   
}
export default Ctx.with3D(PointLight)
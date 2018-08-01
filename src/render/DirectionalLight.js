// @flow

import * as THREE from 'three'

import Ctx from './Context'
import Object3D from './Object3D'

export type DirectionalLightProps = {
  color: number,
}

class DirectionalLight extends Object3D<DirectionalLightProps> {

  init(props: DirectionalLightProps) {
    return new THREE.DirectionalLight(props.color, 1)
  }

  updateProps(oldProps: DirectionalLightProps, newProps: DirectionalLightProps) {
    if (oldProps.color !== newProps.color) {
      this.obj.color.set(newProps.color)
    }
  }
   
}
export default Ctx.with3D(DirectionalLight)
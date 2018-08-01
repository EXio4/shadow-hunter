// @flow

import * as THREE from 'three'

import Ctx from './Context'
import Object3D from './Object3D'

export type AmbientLightProps = {
  color: number,
}

class AmbientLight extends Object3D<AmbientLightProps> {

  init(props: AmbientLightProps) {
    return new THREE.AmbientLight(props.color, 1)
  }

  updateProps(oldProps: AmbientLightProps, newProps: AmbientLightProps) {
    if (oldProps.color !== newProps.color) {
      this.obj.color.set(newProps.color)
    }
  }
   
}
export default Ctx.with3D(AmbientLight)
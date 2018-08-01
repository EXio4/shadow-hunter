// @flow

import * as THREE from 'three'

import Ctx from './Context'
import Object3D from './Object3D'

export type CameraProps = {
  lookAt: [number, number]
}

class Camera extends Object3D<CameraProps> {

  look(lookAt: [number, number], obj: any = this.obj) {
    obj.position.set( lookAt[0]+20, 20, lookAt[1]+20)
    obj.lookAt(lookAt[0], 0, lookAt[1])
  }

  init(props: CameraProps) {
    let d = 20
    let camera = new THREE.OrthographicCamera(-d, d, d, -d, 0.1, 1000)
    this.look(props.lookAt, camera)
    return camera
  }

  updateProps(oldProps: CameraProps, newProps: CameraProps) {
    if (oldProps.lookAt[0] !== newProps.lookAt[0] || oldProps.lookAt[1] !== newProps.lookAt[1]) {
      this.look(this.props.lookAt)
    }
  }
}

export default Ctx.with3D(Camera)
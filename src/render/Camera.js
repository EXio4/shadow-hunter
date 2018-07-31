// @flow

import React from 'react'
import * as THREE from 'three'

import Ctx from './Context'
import type { ContextProps } from './Context'

export type CameraProps = {
  lookAt: [number, number]
}

class Camera extends React.Component<ContextProps & CameraProps> {

  look(lookAt: [number, number]) {
    if (this.props.ctx.renderer && this.props.ctx.renderer.camera) {
      const camera = this.props.ctx.renderer.camera
      camera.position.set( lookAt[0], lookAt[1], 30 )
      camera.lookAt(new THREE.Vector3(lookAt[0], lookAt[1], 0))
    }
  }

  componentDidMount() {
    this.look(this.props.lookAt)
  }

  componentWillUpdate(oldProps: ContextProps & CameraProps, newProps?: ContextProps & CameraProps) {
    if (newProps) {
      if (oldProps.lookAt[0] !== newProps.lookAt[0] || oldProps.lookAt[1] !== newProps.lookAt[1]) {
        this.look(newProps.lookAt)
      }
    }
  }

  render() {
    return null
  }
}

export default Ctx.with3D(Camera)
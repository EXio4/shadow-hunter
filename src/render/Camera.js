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
      camera.position.set( lookAt[0]+20, 20, lookAt[1]+20)
      camera.lookAt(lookAt[0], 0, lookAt[1])
    }
  }

  componentDidMount() {
    this.look(this.props.lookAt)
  }

  componentWillUpdate(oldProps: ContextProps & CameraProps) {
    if (oldProps.lookAt[0] !== this.props.lookAt[0] || oldProps.lookAt[1] !== this.props.lookAt[1]) {
      this.look(this.props.lookAt)
    }
  }

  render() {
    return null
  }
}

export default Ctx.with3D(Camera)
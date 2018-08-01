// @flow

import React from 'react'
import * as THREE from 'three'
import type { Context3D, ContextProps } from './Context'

export class Object3D<Props: {}> extends React.Component<ContextProps & Props> {

  ctx: Context3D
  obj: THREE.Object3D

  constructor(props: ContextProps & Props) {
    super(props)
    this.ctx = props.ctx
    this.obj = this.init(props)
  }

  componentDidMount() {
    if (this.ctx.renderer) {
      this.ctx.renderer.add(this.obj)
    }
  }

  init(props: Props) {
    throw new Error("Object.init should be overloaded")
  }

  updateProps(oldProps: Props, newProps: Props) {
    throw new Error("Object.updateProps should be overloaded")
  }

  componentDidUpdate(oldProps: ContextProps & Props) {
    this.updateProps(oldProps, this.props)
  }

  componentWillUnmount() {
    if (this.ctx.renderer && this.obj) {
      this.ctx.renderer.remove(this.obj)
    }
  }

  render() {
    return null
  }

}

export default Object3D
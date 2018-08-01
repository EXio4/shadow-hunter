// @flow

import React from 'react'
import * as THREE from 'three'
import type { Context3D, ContextProps } from './Context'

let id = () => {}

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
      let renderer = this.ctx.renderer 
      renderer.add(this.obj)
      if (this._isRender()) {
        renderer.evadd(this)
      }
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
      let renderer = this.ctx.renderer
      renderer.remove(this.obj)
      if (this._isRender()) {
        renderer.evdel(this)
      }
    }
  }

  onRender = id

  render() {
    return null
  }


  _isRender = () => {

    return this.onRender !== id
  }

}


export default Object3D
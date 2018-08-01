// @flow
import React from 'react'
import * as THREE from 'three'

import Ctx from './Context'
import type { Context3D, ContextProps } from './Context'

export type TileProps = {
  x: number,
  y: number,
  height: number,
  color: number,
}


class Tile extends React.Component<ContextProps & TileProps> {

  ctx: Context3D
  geometry: THREE.BoxGeometry
  material: THREE.MeshBasicMaterial
  cube: THREE.Mesh

  constructor(props: ContextProps & TileProps) {
    super(props)
    this.ctx = props.ctx
    this.geometry = new THREE.PlaneGeometry(1, 1) // new THREE.BoxGeometry(1, props.height, 1)
    this.material = new THREE.MeshLambertMaterial( { color: props.color, side: THREE.DoubleSide })
    this.cube = new THREE.Mesh(this.geometry, this.material)
    this.cube.position.set(props.x, props.height/12, props.y);
    this.cube.rotation.x = Math.PI * -0.5
  }

  componentDidMount() {
    if (this.ctx.renderer) {
      this.ctx.renderer.add(this.cube)
    }
  }

  componentDidUpdate(oldProps: ContextProps & TileProps) {
    const newProps = this.props
    if (oldProps.height !== newProps.height) { 
      //this.geometry = new THREE.BoxGeometry(1, newProps.height, 1)
      //      this.geometry = new THREE.PlaneGeometry(1, 1)
      this.cube.position.setY(newProps.height/12)
     // this.cube.geometry = this.geometry
    }
    if (oldProps.color !== newProps.color) {
      this.material.color.set(newProps.color)
    }
    if (oldProps.x !== newProps.x || oldProps.y !== newProps.y) {
      this.cube.position.setX(newProps.x)
      this.cube.position.setZ(newProps.y)
    }
  }

  render() {
    return null
  }
}

export default Ctx.with3D(Tile)
// @flow

import React from 'react'
import ResizeObserver from 'react-resize-observer'
import type { Node } from 'react'
import * as THREE from 'three'

import Ctx from './Context'

/*
  one big assumption:
  1:1 is the ratio of the canvas
  this basically allows you to have it remain of constant size on portrait and and landscape mode
*/

export type RendererProps = { 
  children: Node,
}

export class Renderer extends React.Component<RendererProps> {

    size: { height: number, width: number } | null
    aspect: number
    canvas: HTMLCanvasElement | null
    frameId: AnimationFrameID | null
    /* those don't actually mean much due to lack of types */
    renderer: THREE.WebGLRenderer
    scene: THREE.Scene
    camera: THREE.Camera | null

    constructor(props: RendererProps) {
      super(props)
      this.canvas = null
      this.size = null
      this.frameId = null
      this.aspect = 1
      this.camera = null
    }

    updateWinSize = () => {
      if (this.canvas && this.renderer) {
        this.size = {
          width: this.canvas.offsetWidth,
          height: this.canvas.offsetHeight,
        }
        this.renderer.setSize(this.size.width, this.size.height)
      }
    }

    componentWillMount() {
      this.scene = new THREE.Scene()
    }

    componentDidMount() {
      // canvas available
      this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas
      })

      this.updateWinSize()

      this.start()
    }

    componentWillUpdate() {
    }

    componentWillUnmount() {
      this.stop()
    }

    start() {
      if (!this.frameId) {
        this.frameId = requestAnimationFrame(this.animate)
      }
    }
    stop() {
      if (this.frameId) {
        cancelAnimationFrame(this.frameId)
      }
    }

    animate = () => {
      this.renderScene()
      this.frameId = window.requestAnimationFrame(this.animate)
    }
  
    renderScene = () => {
      this.renderer.render(this.scene, this.camera)
    }

    render() {
      let { children, ...props } = this.props
      return (
        <React.Fragment>
          <canvas ref={el => this.canvas = el} {...props}> 
          <ResizeObserver
            onResize={this.updateWinSize}
          />
          </canvas>
          <Ctx.Provider value={{ renderer: this }}>
            {this.props.children}
          </Ctx.Provider>
        </React.Fragment>
      )
    }


    add(geom: THREE.Object3D) {
      if (geom.isCamera) {
        this.camera = geom
      }
      if (this.scene) {
        this.scene.add(geom)
      }
    }

    remove(geom: THREE.Object3D) {
      if (this.scene) {
        this.scene.remove(geom)
      }
    }

}

export default Renderer
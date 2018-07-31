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
    canvas: HTMLCanvasElement | null
    frameId: AnimationFrameID | null
    /* those don't actually mean much due to lack of types */
    renderer: THREE.WebGLRenderer
    scene: THREE.Scene
    camera: THREE.OrthographicCamera

    constructor(props: RendererProps) {
      super(props)
      this.canvas = null
      this.size = null
      this.frameId = null
    }

    updateWinSize() {
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
      window.scene = this.scene
      window.THREE = THREE
      let d = 15
      this.camera = new THREE.OrthographicCamera(-d, d, d, -d, 0.1, 1000)

      this.camera.position.set( 30, 30, 30 ); // all components equal
      this.camera.lookAt(new THREE.Vector3(0,0,0))

      this.scene.add(this.camera)
    }

    componentDidMount() {
      // canvas available
      this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas
      })

      this.updateWinSize()

      this.start()
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


    add(geom: THREE.Geometry) {
      if (this.scene) {
        this.scene.add(geom)
      }
    }

}

export default Renderer
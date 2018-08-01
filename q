[1mdiff --git a/src/components/Tile.js b/src/components/Tile.js[m
[1mindex 49ba635..b1cb433 100644[m
[1m--- a/src/components/Tile.js[m
[1m+++ b/src/components/Tile.js[m
[36m@@ -4,6 +4,7 @@[m [mimport React from 'react'[m
 import type { Node } from 'react'[m
 [m
 import Tile3D from '../render/Tile'[m
[32m+[m[32mimport Material from '../render/Material'[m
 [m
 import type { TileID, Powerup } from '../logic/Tiles'[m
 [m
[36m@@ -29,28 +30,27 @@[m [mconst fromPowerup = (powerup?: Powerup): Node => {[m
         return (<div className="gem green-1" />)[m
     }[m
 }[m
[32m+[m[32mlet colors = new Map()[m
 [m
[31m-const obtainColor = ({ tileId, visible }: TileProps): number => {[m
[31m-  if (!visible) {[m
[31m-    return 0x505060[m
[31m-  }[m
[31m-[m
[31m-  let colors = new Map()[m
[32m+[m[32mcolors.set('grass', new Material(0x98dd00))[m
[32m+[m[32mcolors.set('water', new Material(0x00ddca))[m
[32m+[m[32mcolors.set('sand' , new Material(0xc2b280))[m
[32m+[m[32mcolors.set('desert-sand', new Material(0xf4a460))[m
[32m+[m[32mcolors.set('dirt' , new Material(0xbb8b00))[m
[32m+[m[32mcolors.set('stone', new Material(0x8d8d8d))[m
[32m+[m[32mcolors.set('ice'  , new Material(0xb9e8ea))[m
[32m+[m[32mcolors.set('snow' , new Material(0xfffafa))[m
[32m+[m[32mcolors.set('lava' , new Material(0xcf1020))[m
[32m+[m[32mcolors.set('volcanic', new Material(0x3d3f3e))[m
[32m+[m[32mcolors.set('void' , new Material(0x000000))[m
 [m
[31m-  colors.set('grass', 0x98dd00)[m
[31m-  colors.set('water', 0x00ddca)[m
[31m-  colors.set('sand' , 0xc2b280)[m
[31m-  colors.set('desert-sand', 0xf4a460)[m
[31m-  colors.set('dirt' , 0xbb8b00)[m
[31m-  colors.set('stone', 0x8d8d8d)[m
[31m-  colors.set('ice'  , 0xb9e8ea)[m
[31m-  colors.set('snow' , 0xfffafa)[m
[31m-  colors.set('lava' , 0xcf1020)[m
[31m-  colors.set('volcanic', 0x3d3f3e)[m
[31m-  colors.set('void' , 0x000000)[m
[32m+[m[32mconst obtainColor = ({ tileId, visible }: TileProps): Material => {[m
[32m+[m[32m  if (!visible)[m
[32m+[m[32m    return new Material(0x505060)[m
 [m
[32m+[m[41m  [m
   const val = colors.get(tileId)[m
[31m-  return val ? val : 0xff0000[m
[32m+[m[32m  return val ? val : new Material(0xff0000)[m
 }[m
 [m
 const obtainHeight = ({ tileId, height, visible }: TileProps) => {[m
[36m@@ -63,7 +63,7 @@[m [mconst obtainHeight = ({ tileId, height, visible }: TileProps) => {[m
 export const Tile = (props: TileProps) => ([m
   props.visible ? ([m
     <Tile3D x={props.pos[0]} y={props.pos[1]}[m
[31m-      height={obtainHeight(props)} color={obtainColor(props)} />[m
[32m+[m[32m      height={obtainHeight(props)} material={obtainColor(props)} />[m
   ): null[m
 )[m
 /*[m
[1mdiff --git a/src/render/Tile.js b/src/render/Tile.js[m
[1mindex d0a8f42..e94d9da 100644[m
[1m--- a/src/render/Tile.js[m
[1m+++ b/src/render/Tile.js[m
[36m@@ -4,14 +4,16 @@[m [mimport * as THREE from 'three'[m
 [m
 import Ctx from './Context'[m
 import type { Context3D, ContextProps } from './Context'[m
[32m+[m[32mimport type { Material } from './Material'[m
 [m
 export type TileProps = {[m
   x: number,[m
   y: number,[m
   height: number,[m
[31m-  color: number,[m
[32m+[m[32m  material: Material,[m
 }[m
 [m
[32m+[m[32mconst geom = new THREE.PlaneGeometry(1, 1)[m[41m [m
 [m
 class Tile extends React.Component<ContextProps & TileProps> {[m
 [m
[36m@@ -23,8 +25,8 @@[m [mclass Tile extends React.Component<ContextProps & TileProps> {[m
   constructor(props: ContextProps & TileProps) {[m
     super(props)[m
     this.ctx = props.ctx[m
[31m-    this.geometry = new THREE.PlaneGeometry(1, 1) // new THREE.BoxGeometry(1, props.height, 1)[m
[31m-    this.material = new THREE.MeshLambertMaterial( { color: props.color, side: THREE.DoubleSide })[m
[32m+[m[32m    this.geometry = geom // new THREE.BoxGeometry(1, props.height, 1)[m
[32m+[m[32m    this.material = props.material.material[m
     this.cube = new THREE.Mesh(this.geometry, this.material)[m
     this.cube.position.set(props.x, props.height/12, props.y);[m
     this.cube.rotation.x = Math.PI * -0.5[m
[36m@@ -44,9 +46,6 @@[m [mclass Tile extends React.Component<ContextProps & TileProps> {[m
       this.cube.position.setY(newProps.height/12)[m
      // this.cube.geometry = this.geometry[m
     }[m
[31m-    if (oldProps.color !== newProps.color) {[m
[31m-      this.material.color.set(newProps.color)[m
[31m-    }[m
     if (oldProps.x !== newProps.x || oldProps.y !== newProps.y) {[m
       this.cube.position.setX(newProps.x)[m
       this.cube.position.setZ(newProps.y)[m

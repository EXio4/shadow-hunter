// @flow

import * as THREE from 'three'

/* values between 0 and 1 (0% and 100%) */
export type SpriteOffset = {
  start: [number, number],
  end: [number, number],
}

export const setMaterialOffset = (mat: THREE.SpriteMaterial, off: SpriteOffset) => {
    mat.map.offset = new THREE.Vector2(off.start[0], off.start[1])
    mat.map.repeat = new THREE.Vector2(off.end[0], off.end[1])
}
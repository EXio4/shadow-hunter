// @flow

import type { GameMap } from '../logic/Game'
import type { GState } from '../types'
import { genRandomMap, move, tickStep } from '../logic/Game'
import type { Action } from './actions.js'

//let def = genRandomMap(64, [5, 10])
let menu: GState = { type: 'menu' }

const reducer = (state: GState = menu, action: Action) => {
    if (state.type === 'map') {
        if (action.type === 'move') {
            return { type: 'map', map: move(state.map, action.x, action.y) }
        } else if (action.type === 'tick') {
            return { type: 'map', map: tickStep(state.map) }
        }
    } else if (state.type === 'menu') {
        if (action.type === 'start-game') {
            const size = action.size
            return { type: 'map', map: genRandomMap(size, [Math.floor(size/2), Math.floor(size/2)], action.seed) }  
        }
    }
    return state
}

export default reducer

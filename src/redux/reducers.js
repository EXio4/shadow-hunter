// @flow

import type { GameMap } from '../logic/Game'
import { genRandomMap, move } from '../logic/Game'
import type { Action } from './actions.js'

let def = genRandomMap(64, [5, 10])

const reducer = (state: GameMap = def, action: Action) => {
  if (action.type === 'move') {
    return move(state, action.x, action.y)
  } else { 
    return state;
  }
}

export default reducer
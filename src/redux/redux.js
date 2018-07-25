// @flow

import { createStore } from 'redux'

import type { GameMap } from '../logic/Game'

import reducers from './reducers'

export function configureStore(map?: GameMap) {
  return createStore(reducers, map)
}

export const store = configureStore()
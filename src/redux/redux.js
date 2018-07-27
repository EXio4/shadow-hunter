// @flow

import { createStore } from 'redux'

import type { GState } from '../types.js'

import reducers from './reducers'

export function configureStore(map?: GState) {
  return createStore(reducers, map)
}

export const store = configureStore()

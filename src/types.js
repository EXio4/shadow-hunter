// @flow

import type { GameMap } from './logic/Game'

import type { Action } from './redux/actions'

export type PActions = {
    move: (x: number, y: number) => Action,
    tick: () => Action,
    start: (size: number, seed?: string) => Action,
}

export type MapData = {
    map: GameMap,
}
export type MapProps = MapData & PActions

export type MenuData = {
}

export type MenuProps = MenuData & PActions

export type GState
    = ({ type: 'menu' } & MenuData)
    | ({ type: 'map'  } & MapData)

export type GameProps = {
    st: GState,
    acts: PActions
}

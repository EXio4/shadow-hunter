// @flow


export type MoveAction = { type: 'move', x: number, y: number }
export type Action = MoveAction


export const Move = (x: number, y:number): MoveAction => ({ type: 'move', x: x, y: y })
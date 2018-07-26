// @flow


export type MoveAction = { type: 'move', x: number, y: number }
export type TickAction = { type: 'tick' }
export type Action = MoveAction
                   | TickAction 


export const Move: (number, number) => MoveAction =
        (x: number, y:number): MoveAction => ({ type: 'move', x: x, y: y })
export const Tick: () => TickAction = 
       (): TickAction => ({ type: 'tick' })

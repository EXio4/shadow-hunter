// @flow


// menu actions
export type StartAction = { type: 'start-game', size: number, seed?: string } 

export type MenuActions = StartAction

// map actions
export type MoveAction = { type: 'move', x: number, y: number }
export type TickAction = { type: 'tick' }
 
export type MapActions = MoveAction
                       | TickAction 

export type Action = MenuActions
                   | MapActions


export const Move  =
        (x: number, y:number): MoveAction => ({ type: 'move', x: x, y: y })
export const Tick = 
       (): TickAction => ({ type: 'tick' })
       
export const StartGame  =
        (size: number, seed?: string): StartAction =>
            ({ type: 'start-game', size: size, seed: seed })

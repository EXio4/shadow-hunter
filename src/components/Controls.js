// @flow

import React from 'react'

import type { Action } from '../redux/actions'


type Props = {
    move: (number, number) => Action
}

let style = {
    'position': 'absolute',
    'top': '2vmin',
    'right': '2vmin',
    'width': '16vmin',
    'height': '16vmin',
}

let button = {
    'position': 'absolute',
    'top': '0',
    'left': '0',
    'width': '5vmin',
    'height': '5vmin',
    'fontSize': '4vmin',
    'textAlign': 'center',
    'color': '#30f',
    'backgroundColor': '#fff',
}
let up = {...button,
    'transform': 'translate(5vmin, 0vmin)'
}
let down = {...button,
    'transform': 'translate(5vmin, 10vmin)'
}
let left = {...button,
    'transform': 'translate(0vmin, 5vmin)'
}
let right = {...button, 
    'transform': 'translate(10vmin, 5vmin)'
}

const Controls = (props: Props) => {
    let e_up    = () => props.move( 0, -1)
    let e_down  = () => props.move( 0,  1)
    let e_left  = () => props.move(-1,  0)
    let e_right = () => props.move( 1,  0)
    return (<div style={style}>
        <div style={up}    onClick={e_up}    onTouchdown={e_up}   >⬆️</div>
        <div style={down}  onClick={e_down}  onTouchdown={e_down} >⬇️</div>
        <div style={left}  onClick={e_left}  onTouchdown={e_left} >⬅️</div>
        <div style={right} onClick={e_right} onTouchdown={e_right}>➡️</div>
     </div>
    )
}
export default Controls

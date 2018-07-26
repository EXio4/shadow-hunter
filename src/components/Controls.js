// @flow

import React from 'react'

import type { Action } from '../redux/actions'

import i_up    from '../assets/edgy-16x16-arrow_up.svg'
import i_down  from '../assets/edgy-16x16-arrow_down.svg'
import i_left  from '../assets/edgy-16x16-arrow_left.svg'
import i_right from '../assets/edgy-16x16-arrow_right.svg'

type Props = {
    move: (number, number) => Action
}

let style = {
    'position': 'absolute',
    'bottom': '2vmin',
    'right': '2vmin',
    'width': '32vmin',
    'height': '32vmin',
}

let button = {
    'position': 'absolute',
    'top': '0vmin',
    'left': '0vmin',
    'width': '10vmin',
    'height': '10vmin',
    'color': '#fff',
    'backgroundColor': '#ccc',
    'borderRadius': '30vmin',
    'border': '0.8vmin solid #fff',
    'filter': 'box-shadow(0px 0px 3px red)',
}
let up = {...button,
    'transform': 'translate(10vmin, 0vmin)'
}
let down = {...button,
    'transform': 'translate(10vmin, 20vmin)'
}
let left = {...button,
    'transform': 'translate(0vmin, 10vmin)'
}
let right = {...button, 
    'transform': 'translate(20vmin, 10vmin)'
}

const Controls = (props: Props) => {
    let e_up    = () => props.move( 0, -1)
    let e_down  = () => props.move( 0,  1)
    let e_left  = () => props.move(-1,  0)
    let e_right = () => props.move( 1,  0)
    return (<div style={style}>
        <img alt="UP" style={up}    onClick={e_up}    onTouchdown={e_up}    src={i_up}   />
        <img alt="DW" style={down}  onClick={e_down}  onTouchdown={e_down}  src={i_down} />
        <img alt="LF" style={left}  onClick={e_left}  onTouchdown={e_left}  src={i_left} />
        <img alt="RT" style={right} onClick={e_right} onTouchdown={e_right} src={i_right}/>
     </div>
    )
}
export default Controls

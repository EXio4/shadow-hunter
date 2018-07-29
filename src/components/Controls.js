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
    'position': 'fixed',
    'bottom': '2vmin',
    'left': '2vmin',
    'width': '32vmin',
    'height': '32vmin',
    'transform': 'rotate(45deg)',
}

let button = {
    'position': 'fixed',
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

class Controls extends React.Component<Props> {
    
    e_up    = () => this.props.move( 0, -1)
    e_down  = () => this.props.move( 0,  1)
    e_left  = () => this.props.move(-1,  0)
    e_right = () => this.props.move( 1,  0)
    
    render() {

        return (<div style={style}>
            <img alt="UP" style={up}    onClick={this.e_up}    onTouchdown={this.e_up}    src={i_up}   />
            <img alt="DW" style={down}  onClick={this.e_down}  onTouchdown={this.e_down}  src={i_down} />
            <img alt="LF" style={left}  onClick={this.e_left}  onTouchdown={this.e_left}  src={i_left} />
            <img alt="RT" style={right} onClick={this.e_right} onTouchdown={this.e_right} src={i_right}/>
        </div>)
    }
}

export default Controls

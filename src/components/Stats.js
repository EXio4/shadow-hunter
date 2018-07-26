// @flow

import React from 'react'
import type { PlayerStats } from '../logic/Game.js'


export const Stats = (props: { stats: PlayerStats }) => {
    
    let hpcss = {
        'position': 'fixed',
        'top': '4vmin',
        'left': '3vmin',
        'height': '4vmin',
        'width': '40vmin',
        'border': '0.4vmin solid #7d4',
        'filter': 'drop-shadow(0x, -1vmin, 1vmin) blur(4px)',
    }
    let actualHP = {
        'height': '100%',
        'background': 'linear-gradient(to right, red 0vmin, yellow 17vmin, green 35vmin, violet 40vmin)',
        'width': 'calc(0.35vmin * ' + props.stats.health + ')',
    }
    
    let shieldcss = {
        'position': 'fixed',
        'top': '9vmin',
        'left': '3vmin',
        'height': '4vmin',
        'width': '40vmin',
        'border': '0.4vmin solid #aaa',
        'filter': 'drop-shadow(0x, -1vmin, 1vmin) blur(4px)',
    }
    
    let actualShield = {
        'height': '100%',
        'background': 'linear-gradient(to right, #959595 0vmin, #c5c5c5 20vmin, #bfbfbf 40vmin)',
        'width': 'calc(0.4vmin * ' + props.stats.shield + ')',
    }
    
    let xpcss = {
        'position': 'fixed',
        'top': '4vmin',
        'right': '3vmin',
        'height': '4vmin',
        'width': '40vmin',
        'border': '0.4vmin solid #f3b',
        'filter': 'drop-shadow(0x, -1vmin, 1vmin) blur(4px)',
    }
    let actualXP = {
        'height': '100%',
        'background': 'linear-gradient(to right, violet 0vmin, pink 30vmin, red 40vmin)',
        'width': 'calc(0.4vmin * ' + (100 * props.stats.xp_curr / props.stats.xp_needed) + ')',
    }
    
    return (<React.Fragment>
        <div style={hpcss}>
            <div style={actualHP} />
        </div>
        <div style={shieldcss}>
            <div style={actualShield} />
        </div>
        <div style={xpcss}>
            <div style={actualXP} />
        </div>
    </React.Fragment>)
}

export default Stats;

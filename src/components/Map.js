// @flow

import React from 'react'
import ArrowKeysReact from 'arrow-keys-react'
import BodyClassName from 'react-body-classname'

import Tile from './Tile'
import Stats from './Stats'
import Controls from './Controls'
import Player from './Player'

import { getNearby } from '../logic/Game'
import type { Action } from '../redux/actions'

import './styles.css'

import type { MapProps } from '../types.js'

type WindowSize = {
    width: number,
    height: number
}

type MapState = {
    blocks: number,
    win: WindowSize,
}

let flexbox = {
    'overflow': 'hidden',
    'height': '100vh',
    'width': '100vw',
}

let style = (blocks: number) => ({
  'top': '1vmin',
  'left': 'calc(( 100% -  ' +  String(32 * (blocks*2+1)) + 'px ) / 2)',
  'position': 'absolute',
  'overflow': 'hidden',
  'height': String(32 * (blocks*2+1)) + 'px',
  'width': String(32 * (blocks*2+1)) + 'px',
  'backgroundColor': '#333',
  'transform': 'rotateX(60deg) rotateZ(45deg)',
  'border': '1vmin solid #77a',
})

export class Map extends React.Component<MapProps, MapState> {
    interval: IntervalID | null;
    
    constructor(props: MapProps) {
        super(props)
        this.state = { blocks: 0, win: { height: 0, width: 0 } }
        this.interval = null
    }
    
    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
        if (!this.interval) {
            this.interval = window.setInterval(() => { this.props.tick() }, 1000)
        }
    }

    componentWillUnmount() {
        if (this.interval) {
            window.clearInterval(this.interval)
            this.interval = null
        }
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions = () => {
        let width = window.innerWidth
        let height = window.innerHeight
        let ratio = Math.floor(((width > height ? height : width) / 28)/2 - 0.5)
        
        this.setState({ blocks: ratio, win: { width: window.innerWidth, height: window.innerHeight }});
    }
    
    render() {
        let around = getNearby(this.props.map, this.state.blocks)
        
        ArrowKeysReact.config({
            left: () => {
                this.props.move(-1, 0)
            },
            right: () => {
                this.props.move(1, 0)
            },
            up: () => {
                this.props.move(0, -1)
            },
            down: () => {
                this.props.move(0, 1)
            }
        });

        const blocks = this.state.blocks
        const map = (<div tabIndex="1" className={this.props.map.dead ? 'deadMap' : 'aliveMap'} style={style(blocks)}>
            {around.map((row, x) =>  
            row.map((tile, y) => (
                <Tile {...tile} pos={[x,y]} key={x * 1024 + y} important={x === blocks && y === blocks}>
                {
                    (x === blocks && y === blocks) ? <Player map={this.props.map} /> : null
                }
                </Tile>
            ))
            )}
        </div>)
        
        return (<div
            style={flexbox} {...ArrowKeysReact.events}
            autoFocus >

            <Stats stats={this.props.map.stats} />
            <BodyClassName className={this.props.map.hurt ? 'hurt' : ''}>
                {map}
            </BodyClassName>
            <Controls move={this.props.move} />
        </div>)
    }
}

export default Map

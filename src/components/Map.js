// @flow

import React from 'react'
import ArrowKeysReact from 'arrow-keys-react'
import BodyClassName from 'react-body-classname'

import Tile from './Tile'
import Stats from './Stats'
import Controls from './Controls'
import Player from './Player'

import { getNearby } from '../logic/Game'

import './styles.css'

import type { MapProps } from '../types.js'

import Renderer from '../render/Renderer'
import Camera from '../render/Camera'

type WindowSize = {
    width: number,
    height: number
}

type MapState = {
    blocks: number,
    win: WindowSize,
}

let flexbox = {
    'position': 'absolute',
    'overflow': 'hidden',
    'height': '100vh',
    'width': '100vw',
}

let style = (blocks: number) => ({
  'top': '2vmin',
  'left': 'calc(( 100% -  90vmin ) / 2)',
  'position': 'absolute',
  'overflow': 'hidden',
  'height': '90vmin',
  'width': '90vmin',
  'backgroundColor': '#333',
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
        const map = around.map((tile, { x, y } ) => {
          return (
            <Tile {...tile} pos={[x,y]} key={x * 1024 + y}>

            </Tile>
          )

        }).toSetSeq()
        /*                {
                    (x === blocks && y === blocks) ? <Player map={this.props.map} /> : null
                }
        */
        return (<div tabIndex="1"
            style={flexbox} {...ArrowKeysReact.events}
            autoFocus >

            <Stats stats={this.props.map.stats} />
            <BodyClassName className={this.props.map.hurt ? 'hurt' : ''}>
                <Renderer className={this.props.map.dead ? 'deadMap' : 'aliveMap'} style={style(blocks)}>
                  {map}
                  <Camera lookAt={[this.props.map.playerPos.x, this.props.map.playerPos.x]} />
                </Renderer>
            </BodyClassName>
            <Controls move={this.props.move} />
        </div>)
    }
}

export default Map

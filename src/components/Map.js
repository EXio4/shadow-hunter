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
    win: WindowSize,
}

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
        
        this.setState({ win: { width: window.innerWidth, height: window.innerHeight }});
    }
    
    render() {
        let around = getNearby(this.props.map, 30)
        
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
        return (<div tabIndex="1" {...ArrowKeysReact.events}
            autoFocus >
            <Renderer className={this.props.map.dead ? 'map dead' : 'map'}>
              {map}
              <Camera lookAt={[this.props.map.playerPos.x, this.props.map.playerPos.y]} />
            </Renderer>
            <Stats stats={this.props.map.stats} />
            <Controls move={this.props.move} />
        </div>)
    }
}

export default Map

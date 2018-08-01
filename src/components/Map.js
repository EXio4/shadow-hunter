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
import AmbientLight from '../render/AmbientLight'
import DirectionalLight from '../render/DirectionalLight'
import PointLight from '../render/PointLight'

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
        
        this.setState({ win: { width: width, height: height } })
    }
    
    render() {
        let around = getNearby(this.props.map, 50)
        
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

        const map = around.map((tile, { x, y } ) => (<Tile {...tile} pos={[x,y]} key={x * 1024 + y} />)).toSetSeq().toArray()
        /*                {
                    (x === blocks && y === blocks) ? <Player map={this.props.map} /> : null
                }
        */
        let playerHeight_ = this.props.map.map.get(this.props.map.playerPos)
        let playerHeight = 8 + (playerHeight_ ? playerHeight_.height / 9 : 2)

        return (<div tabIndex="1" {...ArrowKeysReact.events}
            autoFocus >
            <Renderer className={this.props.map.dead ? 'map dead' : 'map'}>
              <AmbientLight color={0x606060} />
              <DirectionalLight color={0x909090} />
              
              <Camera lookAt={[this.props.map.playerPos.x, this.props.map.playerPos.y]} />
              {map}
            </Renderer>
            <Stats stats={this.props.map.stats} />
            <Controls move={this.props.move} />
        </div>)
    }
    //<PointLight color={0xffffff} position={[this.props.map.playerPos.x, playerHeight, this.props.map.playerPos.y]} distance={40} />
}

export default Map

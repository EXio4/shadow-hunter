// @flow

import React from 'react'
import ArrowKeysReact from 'arrow-keys-react'

import Tile from './Tile'
import Controls from './Controls'

import type { GameMap } from '../logic/Game'
import { getNearby } from '../logic/Game'
import type { Action } from '../redux/actions'

import idle_cat from '../assets/idle_cat.png'
import './styles.css'

export type MapProps = {
  map: GameMap,
  move: (number, number) => Action
}

type MapState = {
    blocks: number,
    win: WindowSize,
}

let flexbox = {
    'display': 'flex',
    'justifyContext': 'center',
}

let style = (blocks: number) => ({
  'flex': '0 0 auto', 
  'position': 'absolute',
  'height': String(32 * (blocks*2)) + 'px',
  'width': String(32 * (blocks*2)) + 'px',
  'backgroundColor': '#333'
})

export class Map extends React.Component<MapProps, MapState> {
    constructor(props: MapProps) {
        super(props)
        this.state = { blocks: 0, win: { height: 0, width: 0 } }
    }
    
    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions = () => {
        let width = window.innerWidth
        let height = window.innerHeight
        let ratio = Math.round(((width > height ? height : width) / 32)/2) - 2
        
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
        const map = (<div tabIndex="1" style={style(blocks)}>
            {around.map((row, x) =>  
            row.map((tile, y) => (
                <Tile {...tile} pos={[x,y]} key={x * 1024 + y} important={x === blocks && y === blocks}>
                {
                    (x === blocks && y === blocks) ? <img className="idle" /> : null
                }
                </Tile>
            ))
            )}
        </div>)
        
        return (<div style={flexbox} {...ArrowKeysReact.events}>
            {map}
            <Controls move={this.props.move} />
        </div>)
    }
}

export default Map

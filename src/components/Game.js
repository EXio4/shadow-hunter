// @flow

import React from 'react'

import GMap from './Map'
import Menu from './Menu'

import type { GameProps, GState } from '../types'

export const Game = (props: GameProps) => {
    let s: GState = props.st
    if (s.type === 'menu') {
        return <Menu {...s.st} {...s.acts} />
    } else if (s.type === 'map') {
        return <GMap {...s.st} {...s.acts} />
    }
}

export default Game;

// @flow

import React from 'react'

import GMap from './Map'
import Menu from './Menu'

import type { GameProps, GState } from '../types'

export const Game = (props: GameProps) => {
    let st: GState = props.st
    if (st.type === 'menu') {
        return <Menu {...st} {...props.acts} />
    } else if (st.type === 'map') {
        return <GMap {...st} {...props.acts} />
    }
}

export default Game;

// @flow

import React from 'react'
import type { MenuProps } from '../types.js'
import './menu.css'

const Menu = (props: MenuProps) => {
    return (<div className="menu">
        <div className="menu-header">
            Shadow Hunter!
        </div>
        
        <div className="menu-start"
            onClick={() => props.start(128)}
            onTouchdown={() => props.start(128)}>
            START GAME
        </div>
    </div>)
}

export default Menu;

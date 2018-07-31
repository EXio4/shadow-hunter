// @flow

import React from 'react'
import type { ComponentType } from 'react'
import type { Renderer } from './Renderer'

export type Context3D = {
  renderer?: Renderer,
}

export const { Provider, Consumer } = React.createContext({})

export type ContextProps = {
  ctx: Context3D
}
export function with3D<Props: ContextProps>(Component: ComponentType<Props>): ComponentType<$Diff<Props, ContextProps>> {
  return ((props: $Diff<Props, ContextProps>) => {
    return (
      <Consumer>
        {(value: Context3D) => <Component {...props} ctx={value} />}
      </Consumer>
    )  
  })
}

export default { 
  Provider, Consumer, with3D
}


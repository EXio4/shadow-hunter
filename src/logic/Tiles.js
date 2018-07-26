// @flow



export type TileID = "grass"
                   | "water"
                   | "sand"
                   | "stone"
                   | "void"
                  
export type Powerup =
            { type: 'health', hp: number }
          | { type: 'shield', shield: number }
          | { type: 'xp', xp: number }
                  
export type Tile = {
  tileId: TileID,
  height: number,
  visible: boolean,
  powerup?: Powerup,
}


export const randomPowerup = (): Powerup => {
    return { type: 'health', hp: 25 }
}

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
    let coeff = Math.random()
    if (coeff < 0.5) {
        return { type: 'xp', xp: Math.floor(10 + 20 * coeff) }
    } else if (coeff < 0.8) {
        return { type: 'shield', shield: Math.floor(25 * coeff) }
    } else {
        return { type: 'health', hp: 5 +  10 * (coeff - 0.8) }
    }
}

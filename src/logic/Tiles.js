// @flow



export type TileID = "grass"
                   | "water"
                   | "dirt"
                   | "stone"
                   | "void"


export type Tile = {
  tileId: TileID,
  visible: boolean,
}

export const randomTile = (): TileID => {
  let type: TileID[] = ["grass", "stone", "water", "dirt"]
  return type[Math.floor(type.length * Math.random())]
}
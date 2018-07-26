// @flow



export type TileID = "grass"
                   | "water"
                   | "sand"
                   | "stone"
                   | "void"


export type Tile = {
  tileId: TileID,
  height: number,
  visible: boolean,
}

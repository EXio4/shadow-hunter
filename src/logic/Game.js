// @flow

import type { Tile, TileID } from './Tiles'
import { randomTile } from './Tiles'

import Noise from 'simplex-noise'

export type Vec2 = [number, number]

export type GameMap = {
  map: Tile[][],
  mapBounds: [Vec2, Vec2],
  playerPos: Vec2,
}

export const getNearby = (game: GameMap, blocks: number): Tile[][] => {

  let res: Tile[][] = []

  for (let ox = -blocks; ox <= blocks; ox++) {
    let x = game.playerPos[0] + ox
    let row: Tile[] = []
    for (let oy = -blocks; oy <= blocks; oy++) {
      let y = game.playerPos[1] + oy

      if (x >= game.mapBounds[0][0] && y >= game.mapBounds[0][1] && x < game.mapBounds[1][0] && y < game.mapBounds[1][1]) {
        // exists in map  
        row.push(game.map[x][y])
      
      } else {
        // out of bounds

        row.push({ tileId: 'void', visible: true })

      }
    }
    res.push(row)
  }

  return res
}



let updateFOV = (_game: GameMap): GameMap => {

  // awful
  let game: GameMap = JSON.parse(JSON.stringify(_game))

  let blocks = 4
  for (let ox = -blocks; ox <= blocks; ox++) {
    let x = game.playerPos[0] + ox
    let row: Tile[] = []
    for (let oy = -blocks; oy <= blocks; oy++) {
      let y = game.playerPos[1] + oy
      if (x >= game.mapBounds[0][0] && y >= game.mapBounds[0][1] && x < game.mapBounds[1][0] && y < game.mapBounds[1][1]) {
          if (ox**2 + oy**2 <= 16) {
            game.map[x][y].visible = true
          }
      }
    }
  }

  return game

}

export const move = (_game: GameMap, x: number, y: number): GameMap => {
    // awful
    let game: GameMap = JSON.parse(JSON.stringify(_game))
    let nx = game.playerPos[0] + x
    let ny = game.playerPos[1] + y
    if (nx >= game.mapBounds[0][0] && nx < game.mapBounds[1][0] && ny >= game.mapBounds[0][1] && ny < game.mapBounds[1][1]) {
      game.playerPos = [nx, ny]
      return updateFOV(game)
    }
    return _game
}


export const genRandomMap = (size: number, playerPos: [number, number], seed?: string): GameMap => {
  let noise = new Noise(seed)
  let map: Tile[][] = []
  for (let x=0; x<size; x++) {
    let row: Tile[] = []
    for (let y=0; y<size; y++) {
      let d = 14 * (noise.noise2D(x/5, y/5) + 1)
      let type = "void"
      if      (d <= 6)   { type = "water"; d = 5 }
      else if (d <= 10)  { type = "sand" ; }
      else if (d <= 18)  { type = "grass"; }
      else               { type = "stone"; }
      d -= 7
      row.push( { tileId: type, height: Math.floor(d), visible: false } )
    }
    map.push(row)
  }

  let game = { map: map, mapBounds: [[0,0], [size,size]], playerPos: playerPos }

  return updateFOV(game)
}

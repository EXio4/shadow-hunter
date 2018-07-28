// @flow

import type { Tile, TileID, Powerup } from './Tiles'
import { randomPowerup } from './Tiles'
import Noise from 'simplex-noise'

export type Vec2 = [number, number]

export type PlayerStats = {
    health: number,
    shield: number,
    lvl: number,
    xp_curr: number,
    xp_needed: number,
}

export type GameMap = {
  map: Tile[][],
  mapBounds: [Vec2, Vec2],
  playerPos: Vec2,
  stats: PlayerStats,
  hurt: boolean,
  dead: boolean,
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

        row.push({ tileId: 'void', height: -4, visible: true })

      }
    }
    res.push(row)
  }

  return res
}



let updateFOV = (_game: GameMap): GameMap => {

  // awful
  let game: GameMap = JSON.parse(JSON.stringify(_game))

  let blocks = 6
  for (let ox = -blocks; ox <= blocks; ox++) {
    let x = game.playerPos[0] + ox
    let row: Tile[] = []
    for (let oy = -blocks; oy <= blocks; oy++) {
      let y = game.playerPos[1] + oy
      if (x >= game.mapBounds[0][0] && y >= game.mapBounds[0][1] && x < game.mapBounds[1][0] && y < game.mapBounds[1][1]) {
          if (ox**2 + oy**2 <= 27) {
            game.map[x][y].visible = true
          }
      }
    }
  }

  return game

}

export const move = (_game: GameMap, x: number, y: number): GameMap => {
    if (_game.dead) return _game
    let nx = _game.playerPos[0] + x
    let ny = _game.playerPos[1] + y
    if (nx >= _game.mapBounds[0][0] && nx < _game.mapBounds[1][0] && ny >= _game.mapBounds[0][1] && ny < _game.mapBounds[1][1]) {        
        // awful
        let game: GameMap = JSON.parse(JSON.stringify(_game))
        game.playerPos = [nx, ny]
        return kittenStep(updateFOV(game))
    }
    return _game
}

type Seeds = {
    [string]: Noie
}

const genTile = (seeds: Seeds, x: number, y: number): [TileId, number] => {
    let noise = 11 * (seeds['noise'].noise2D(x/8, y/9) + 1) - 2 // -2 - 20, should help with depth/height
    let humid = 50 * (seeds['humid'].noise2D(x/96, y/96) + 1) // 0% - 100% humidity
    let temp  = 30 * (seeds['temp'].noise2D(x/128, y/128) + 0.5) // -15 to 45, 0 defines water freezing
    /*
     * The idea behind the algorithm is that it will pick for:
     * low humidity implies less water/desert
     * high humidity implies no fire
     * 
     * temps define if there's snow/ice (<= 0 implies below freezing)
     * and if they're too high it becomes a volcanic biome
     * 
     */
    
    
    if (humid <= 20) { 
        // higher due to low humidity, to avoid water
        noise += 2 * Math.sin((20-humid) / (Math.PI/40))
    }
    
    
    let type = "void"

    if (temp <= 0) {
        // icy 
        if (noise <= 6) {
            type = "ice"
            noise = 5
        } else {
            type = "snow"
        }
    } else if (temp <= 40) {
        // normal
        if (noise <= 6) {
            if (temp <= 2.5) {
                type = "ice"
            } else if (temp <= 38) {
                type = "water"
            } else {
                type = "volcanic"
            }
            noise = 5
        } else if (noise <= 10) {
            type = "sand"
        } else if (noise <= 18) {
            type = "grass"
        } else {
            type = "stone"
        }
    } else {
        // hell-ish
        if (noise <= 6) {
            type = "lava"
            noise = 5
        } else {
            type = "volcanic"
        }
    }
    
    return [type, Math.round(noise)]
 
}

export const genRandomMap = (size: number, playerPos: [number, number], seed?: string): GameMap => {
  if (!seed) seed = String(Math.random()*1000)
  let seeds = {
      temp:  new Noise("temps" + seed),
      noise: new Noise("noise" + seed),
      humid: new Noise("humid" + seed),
      gen:   new Noise("gen" + seed)
  }
  let map: Tile[][] = []
  for (let x=0; x<size; x++) {
    let row: Tile[] = []
    for (let y=0; y<size; y++) {
        let type = genTile(seeds, x,y)
        row.push( { tileId: type[0], height: Math.floor(type[1]), visible: false } )
    }
    map.push(row)
  }

  let stats = {
      health: 100,
      shield: 0,
      lvl: 0,
      xp_curr: 0,
      xp_needed: 100,
  }
 
  let player = playerPos
  if (map[player[0]][player[1]].tileId === 'water' || map[player[0]][player[1]].tileId === 'lava') { 
      for (let ox=0; ox<size; ox++) {
          let x = player[0] + ox
          if (x < size) {
              if (map[x][player[1]].tileId !== 'water' && map[x][player[1]].tileId !== 'lava') {
                  player = [x, player[1]]
                  break
              }
          }
      }
  }
  let game = {
    map: map,
    mapBounds: [[0,0], [size,size]],
    playerPos: player,
    stats: stats,
    hurt: false,
    dead: false
  }

  return updateFOV(game)
}

const hurt = (_game: GameMap, c: number, shield_rate: number = 1) => {
    _game.hurt = true
    let sh = Math.round(c * shield_rate)
    let rm = Math.round(c * (1 - shield_rate))
    _game.stats.shield -= sh
    _game.stats.health -= rm
    if (_game.stats.shield < 0) {
        _game.stats.health -= Math.abs(_game.stats.shield)
        _game.stats.shield = 0
    }
    if (_game.stats.health <= 0) {
        _game.dead = true
        _game.stats.health = 0
    }
}

const give = (_game: GameMap, c: number) => {
    _game.hurt = false
    _game.stats.health += c
    if (_game.stats.health >= 125) {
        _game.stats.health = 125
    }
}

const give_shield = (_game: GameMap, c: number) => {
    _game.stats.shield += c
    if (_game.stats.shield >= 100) {
        _game.stats.shield = 100
    }
}

const increase_xp = (_game: GameMap, c: number) => {
    _game.stats.xp_curr += c
    while (_game.stats.xp_curr >= _game.stats.xp_needed) {
        _game.stats.xp_curr -= _game.stats.xp_needed
        _game.stats.lvl++
        _game.stats.xp_needed = 100 * _game.stats.lvl
    }
}

const kittenStep = (_game: GameMap): GameMap => {
    // awful
    let game: GameMap = JSON.parse(JSON.stringify(_game))
    
    const tile = game.map[game.playerPos[0]][game.playerPos[1]].tileId
    if (tile === 'water') {
        hurt(game, 5)
    }
    if (tile === 'lava') {
        hurt(game, 10, 0.75)
    }
    
    
    if (game.map[game.playerPos[0]][game.playerPos[1]].powerup) {
        const pup: Powerup = game.map[game.playerPos[0]][game.playerPos[1]].powerup;
        if (pup.type === 'health') {
            give(game, pup.hp)
        }
        if (pup.type === 'shield') {
            give_shield(game, pup.shield)
        }
        if (pup.type === 'xp') {
            increase_xp(game, pup.xp)
        }
        game.map[game.playerPos[0]][game.playerPos[1]].powerup = undefined
    }
    
    return game
}

export const tickStep = (_game: GameMap): GameMap => {
    // awful
    let game: GameMap = JSON.parse(JSON.stringify(_game))
    
    let area = Math.abs((_game.mapBounds[0][0] - _game.mapBounds[1][0])) *
               Math.abs((_game.mapBounds[0][1] - _game.mapBounds[1][1]))
    
    for (let i=0; i<area; i += 2048) {
        if (Math.random() < 1/(10*i)) {
            let x = Math.floor(Math.abs((_game.mapBounds[0][0] - _game.mapBounds[1][0]) * Math.random()))
            let y = Math.floor(Math.abs((_game.mapBounds[0][1] - _game.mapBounds[1][1]) * Math.random()))
            if (game.map[x][y].tileId !== 'water' && game.playerPos[0] !== x && game.playerPos[1] !== y) {
                game.map[x][y].powerup = randomPowerup()
            }
        }
    }
    
    if (game.stats.health > 100) {
        game.stats.health -= 1
    } 
    
    game.hurt = false
    const tile = game.map[game.playerPos[0]][game.playerPos[1]].tileId
    if (tile === 'water') {
        // we're drowning!
        hurt(game, 10)
    }
    if (tile === 'lava') {
        hurt(game, 25, 0.5)
    }
    
    
    return game
}

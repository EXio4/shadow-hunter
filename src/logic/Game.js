// @flow

import type { Tile, TileID, Powerup } from './Tiles'
import { randomPowerup } from './Tiles'
import { Map as IMap, Record, List as IList } from 'immutable'
import type { RecordOf, RecordFactory } from 'immutable'
import Noise from 'simplex-noise'

type _Vec2 = {
    x: number,
    y: number
}
export type Vec2 = RecordOf<_Vec2>
type _PlayerStats = {
    health: number,
    shield: number,
    lvl: number,
    xp_curr: number,
    xp_needed: number,
}
export type PlayerStats = RecordOf<_PlayerStats>
type _GameMap = {
  map: IMap<Vec2, Tile>,
  mapBounds: [Vec2, Vec2],
  playerPos: Vec2,
  stats: PlayerStats,
  hurt: boolean,
  dead: boolean,
}

export type GameMap = RecordOf<_GameMap>

const CVec2: RecordFactory<_Vec2> = Record({ x: 0, y: 0 })
const CPlayerStats: RecordFactory<_PlayerStats> = Record({ health: 100, shield: 0, lvl: 0, xp_curr: 0, xp_needed: 100 })
const CGameMap: RecordFactory<_GameMap> = Record({
    map: IMap(),
    mapBounds: [CVec2({x:0,y:0}),CVec2({x:0,y:0})],
    playerPos: CVec2({x:0,y:0}), 
    stats: CPlayerStats(),
    hurt: false,
    dead: false,
})

export const withinBounds = (game: GameMap, pos: Vec2): boolean => {
    return (pos.x >= game.mapBounds[0].x && pos.y >= game.mapBounds[0].y && pos.x < game.mapBounds[1].x && pos.y < game.mapBounds[1].y)
}

export const getNearby = (game: GameMap, blocks: number): Tile[][] => {

  let res: Tile[][] = []

  for (let ox = -blocks; ox <= blocks; ox++) {
    let x = game.playerPos.x + ox
    let row: Tile[] = []
    for (let oy = -blocks; oy <= blocks; oy++) {
      let y = game.playerPos.y + oy
      let tile = game.map.get(CVec2({x,y}))
      if (tile != null) {
        row.push(tile)
      } else {
        row.push({ tileId: 'void', height: -4, visible: true })
      }
    }
    res.push(row)
  }

  return res
}



let updateFOV = (_game: GameMap): GameMap => {
    return _game.update('map',(_map) => _map.withMutations(map => {
        let blocks = 6
        for (let ox = -blocks; ox <= blocks; ox++) {
            let x = _game.playerPos.x + ox
            let row: Tile[] = []
            for (let oy = -blocks; oy <= blocks; oy++) {
                let y = _game.playerPos.y + oy
                let pos = CVec2({x,y})
                if (withinBounds(_game, pos) && ox**2 + oy**2 <= 27) {
                    map = map.update(pos,(tile: Tile) => ({...tile, visible: true }))
                }
            }
        }
        return map
    }))
}

export const move = (_game: GameMap, x: number, y: number): GameMap => {
    if (_game.dead) return _game
    let pos = CVec2({
        x: _game.playerPos.x + x,
        y: _game.playerPos.y + y,
    })
    if (withinBounds(_game, pos)) {        
        let game = _game.set('playerPos', pos)
        return kittenStep(updateFOV(game))
    }
    return _game
}

type Seeds = {
    [string]: Noise
}

const genTile = (seeds: Seeds, x: number, y: number): [TileID, number] => {
    let noise = 16 * (seeds['noise'].noise2D(x/10, y/10) + 1) - 2 // -2 - 30, should help with depth/height
    let humid = 50 * (seeds['humid'].noise2D(x/128, y/128) + 1) // 0% - 100% humidity
    let temp  = 32.5 * (seeds['temp'].noise2D(x/96, y/96) + 1) - 15 // -15 to 50, 0 defines water freezing
    /*
     * The idea behind the algorithm is that it will pick for:
     * low humidity implies less water/desert
     * high humidity implies no fire
     * 
     * temps define if there's snow/ice (<= 0 implies below freezing)
     * and if they're too high it becomes a volcanic biome
     * 
     */
    
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
        if (humid <= 25 && noise <= 7) {
            // adjust water level due to humidity
            noise += 5 * (25-humid)/25
        }
        if (noise <= 6) {
            if (temp <= 2.5) {
                type = "ice"
            } else if (temp <= 38) {
                type = "water"
            } else {
                type = "volcanic"
            }
            noise = 5
        } else if (humid <= 25) {
            type = "desert-sand"
        } else if (noise <= 15) {
            type = "sand"
        } else if (noise <= 25) {
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
      humid: new Noise("wet" + seed),
      gen:   new Noise("gen" + seed)
  }
  let map = IMap().withMutations((map) => {
    for (let x=0; x<size; x++) {
      for (let y=0; y<size; y++) {
          let pos = CVec2({x,y})
          let type = genTile(seeds, x,y)
          map = map.set(pos, ( { tileId: type[0], height: Math.floor(type[1]), visible: false } ))
      }
    }
    return map
  })

  let stats = CPlayerStats({
      health: 100,
      shield: 0,
      lvl: 0,
      xp_curr: 0,
      xp_needed: 100,
  })
  let game = CGameMap({
    map: map,
    mapBounds: [CVec2({x:0,y:0}), CVec2({x:size,y:size})],
    playerPos: CVec2({x: playerPos[0], y: playerPos[1]}),
    stats: stats,
    hurt: false,
    dead: false
  })
    
  let player = game.playerPos  
 
  let pos = player
  for (let ox=0; ox<size; ox++) {
      pos = CVec2({ x: pos.x + 1, y: pos.y })
      let tile = map.get(pos)
      if (tile && tile.tileId !== 'water' && tile.tileId !== 'lava') {
        player = pos
        break
      }
  }

  return updateFOV(game.set('playerPos', player))
}

const hurt = (_game: GameMap, c: number, shield_rate: number = 1) => {
    return _game.withMutations(game => {
      game = game.set('hurt',true)
      let sh = Math.round(c * shield_rate)
      let rm = Math.round(c * (1 - shield_rate))
      game = game.updateIn(['stats', 'shield'], (x) => x - sh)
      game = game.updateIn(['stats', 'health'], (x) => x - sh)
      let _shield = game.getIn(['stats', 'shield'])
      if (_shield && _shield < 0) {
        game = game.updateIn(['stats', 'health'], (x) => x - Math.abs(_shield))
        game = game.setIn(['stats', 'shield'], 0)
      }
      let _health = game.getIn(['stats', 'health'])
      if (_health && _health <= 0) {
        game = game.set('dead', true)
        game = game.setIn(['stats', 'health'], 0)
      }
      return game
    })
}

const give = (_game: GameMap, c: number) => {
    return _game.withMutations(game => {
      game = game.set('hurt', false)
      return game.updateIn(['stats', 'health'], (x) => Math.min(x + c, 125))
    })
}

const give_shield = (_game: GameMap, c: number) => {
    return _game.withMutations(game => {
      return game.updateIn(['stats', 'shield'], (x) => Math.min(x + c, 100))
    })
}

const increase_xp = (_game: GameMap, c: number) => {
    return _game.withMutations(game => {
      game = game.updateIn(['stats', 'xp_curr'], (x) => x+c)
      let xp_curr: any = game.getIn(['stats', 'xp_curr'])
      let xp_needed: any = game.getIn(['stats', 'xp_needed'])
      while (typeof xp_curr === 'number' && typeof xp_needed === 'number' && xp_curr >= xp_needed) {
        game = game.updateIn(['stats', 'xp_curr'], (x) => x - xp_needed)
        game = game.updateIn(['stats', 'lvl'], (x) => x+1)
        let lvl = game.getIn(['stats', 'lvl'])
        if (!lvl) lvl = 1
        game = game.setIn(['stats', 'xp_needed'], 100 * lvl)
        xp_curr = game.getIn(['stats', 'xp_curr'])
        xp_needed = game.getIn(['stats', 'xp_needed'])
      }
      return game
    })
}

const kittenStep = (game: GameMap) => {
    const tile = game.map.get(game.playerPos)
    if (tile && tile.tileId === 'water') {
        game = hurt(game, 5)
    }
    if (tile && tile.tileId === 'lava') {
        game = hurt(game, 10, 0.75)
    }
    
    
    if (tile && tile.powerup) {
        const pup: Powerup = tile.powerup;
        if (pup.type === 'health') {
            game = give(game, pup.hp)
        }
        if (pup.type === 'shield') {
            game = give_shield(game, pup.shield)
        }
        if (pup.type === 'xp') {
            game = increase_xp(game, pup.xp)
        }
        game = game.update('map', (map) => map.update(game.playerPos, (tile) => ({ ...tile, powerup: undefined })))
    }
    
    return game
}

export const tickStep = (_game: GameMap): GameMap => {
    return _game.withMutations(game => {
      let mapBounds = game.get('mapBounds')
      if (mapBounds == null) return
      let map = game.get('map')
      if (map == null) return
      let playerPos = game.get('playerPos')
      if (playerPos == null) return
      let stats = game.get('stats')
      if (stats == null) return
          
      let area = Math.abs(mapBounds[0].x - mapBounds[1].x) *
                 Math.abs(mapBounds[0].y - mapBounds[1].y)
 
        for (let i=0; i < area; i += 2048) {
          if (Math.random() < 1/(10*i)) {
            let pos = CVec2({
              x: Math.floor(Math.abs((mapBounds[0].x - mapBounds[1].x) * Math.random())),
              y: Math.floor(Math.abs((mapBounds[0].y - mapBounds[1].y) * Math.random())),
            })
            let tile = map.get(pos)
            if (tile && pos !== playerPos && tile.tileId !== 'water' && tile.tileId !== 'lava') { 
              game = game.update('map', (map) => 
                map.update(pos, (tile) =>
                    ({...tile, powerup: randomPowerup() })))
          }
        }
      }
      
      if (stats.health > 100) {
        game = game.updateIn(['stats', 'health'], (x) => x-1)
      }
      
      game.set('hurt', false)
      const tile = map.get(playerPos)
      if (tile && tile.tileId === 'water') {
          // we're drowning!
          game = hurt((game: any), 10)
      }
      if (tile && tile.tileId === 'lava') {
          game = hurt((game: any), 25, 0.5)
      }
      return game
    })
}

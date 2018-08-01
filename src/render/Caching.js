// @flow


export function initCache<K,T>(fn: (K => T)): (K => T) {
  let cache: Map<K,T> = new Map()
  return (key: K) => {
    let value: T | void = cache.get(key)
    if (value === undefined) {
      value = fn(key)
      cache.set(key,value)
    }
    return value
  }
}

export default { init: initCache }
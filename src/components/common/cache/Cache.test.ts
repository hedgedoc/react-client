import { Cache } from './Cache'

describe('Test caching functionality', () => {
  it('initialize with right lifetime, no entry limit', () => {
    const lifetime = 1000
    const testCache = new Cache<string, string>(lifetime)
    expect(testCache.entryLifetime).toEqual(lifetime)
    expect(testCache.maxEntries).toEqual(0)
  })

  it('initialize with right lifetime, given entry limit', () => {
    const lifetime = 1000
    const maxEntries = 10
    const testCache = new Cache<string, string>(lifetime, maxEntries)
    expect(testCache.entryLifetime).toEqual(lifetime)
    expect(testCache.maxEntries).toEqual(maxEntries)
  })

  it('')
})

import { CryptoHelper } from '../CryptoHelper'

describe('CryptoHelper', () => {
  describe('randomBytes()', () => {
    it('should work given normal parameters n=32', () => {
      const n = 32
      const random = CryptoHelper.randomBytes(n)
      expect(random.length).toBe(n)
    })
  })
})

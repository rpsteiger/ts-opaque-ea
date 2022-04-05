import { range, rangez } from '../functionalJS/functionalJS'

describe('functionalJS functions', () => {
  describe('range()', () => {
    it('should return empty arry on 0,0', () => {
      expect(range(0, 0)).toEqual([])
    })
    it('should return an empty array on n,n', () => {
      expect(range(42, 42)).toEqual([])
    })
    it('should return an empty array when start>stop', () => {
      expect(range(0, -5)).toEqual([])
    })
    it('should work on 0..5', () => {
      expect(range(0, 5)).toEqual([0, 1, 2, 3, 4])
    })
    it('should work on negative values when start<0&&stop<0', () => {
      expect(range(-6, -2)).toEqual([-6, -5, -4, -3])
    })
  })

  describe('rangez()', () => {
    it('should work on 5', () => {
      expect(rangez(5)).toEqual([0, 1, 2, 3, 4])
    })
  })
})

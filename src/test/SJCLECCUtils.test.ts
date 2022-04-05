import { SCJLECCUtils } from '../SJCLECCUtils'
import * as sjcl from 'sjcl'
import { TextEncoder } from 'util'
import { h2Curve } from '../h2c/h2c'
import { EPERM } from 'node:constants'

describe('SJCLECCUtils', () => {
  const password1 = 'test1'

  describe('randomScalar()', () => {
    it("do something and do not crash'", () => {
      expect(() => new SCJLECCUtils().randomScalar()).not.toThrow()
    })
    it('should not yield be same value when called multiple times in a row', () => {
      const p256Curve = new SCJLECCUtils()
      const randomValue1 = p256Curve.randomScalar()
      const randomValue2 = p256Curve.randomScalar()
      const randomValue3 = p256Curve.randomScalar()
      expect(randomValue1.equals(randomValue2)).toEqual(false)
      expect(randomValue1.equals(randomValue3)).toEqual(false)
    })
  })
  describe('bnToByteArray()', () => {
    it('should create 0xFF from 255', () => {
      const p256Curve = new SCJLECCUtils()
      const two55 = new sjcl.bn(255)
      const actual = p256Curve.bnToByteArray(two55)
      expect(new Uint8Array(actual)[0]).toEqual(255)
    })
  })
  describe('pointToByteArray()', () => {
    it('should map the curve point to a byte array', () => {
      const x = new sjcl.bn('0x0D')
      const y = new sjcl.bn('0x0BC4')
      const p256Curve = new SCJLECCUtils()
      const myPoint = new sjcl.ecc.point(p256Curve.curve, x, y)
      // prettier-ignore
      const expected = Uint8Array.from([
        0, 0,  0,   0, 0, 0, 0,  0, 0, 0, 0, 0,
        0, 0,  0,   0, 0, 0, 0,  0, 0, 0, 0, 0,
        0, 0,  0,   0, 0, 0, 0, 0x0d, 0, 0, 0, 0,
        0, 0,  0,   0, 0, 0, 0,  0, 0, 0, 0, 0,
        0, 0,  0,   0, 0, 0, 0,  0, 0, 0, 0, 0,
        0, 0, 0x0b, 0xc4
      ])
      const actual = p256Curve.pointToByteArray(myPoint)
      expect(actual).toEqual(expected)
    })
  })
  describe('bnToByteArray()', () => {
    it('should create 17918 from 0x45FE', () => {
      const p256Curve = new SCJLECCUtils()
      const buffer = Uint8Array.from([0x45, 0xfe])
      const actual = p256Curve.byteArrayToBn(buffer)
      const expected = new sjcl.bn('0x45FE')
      expect(actual.equals(expected)).toEqual(true)
    })
  })
  describe('byteArraytoHexString()', () => {
    it('should work given valid buffer param', () => {
      // prettier-ignore
      const data = Uint8Array.from([4,-127,45,126,58,-104,41,-27,-43,27,-35,100,-50,-77,93,-16,96,105,-101,-63,48,-105,49,-67,110,111,26,84,67,-89,-7,-50,10,-12,56,47,-49,-42,-11,-8,-96,-117,-78,97,-105,9,-62,-44,-97,-73,113,96,23,112,-14,-62,103,-104,90,-14,117,78,31,-116,-7])
      // prettier-ignore
      const expected = '4812d7e3a9829e5d51bdd64ceb35df060699bc1309731bd6e6f1a5443a7f9ceaf4382fcfd6f5f8a08bb261979c2d49fb771601770f2c267985af2754e1f8cf9'
      const p256Curve = new SCJLECCUtils()
      expect(p256Curve.byteArraytoHexString(data.buffer)).toEqual(expected)
    })
  })
  describe('bntoHexString', () => {
    it('should work given a valid sjcl.bn param', () => {
      // 0x0539 = 1337 (dec.)
      const numStr = '539'
      const bnNumber = new sjcl.bn(numStr)
      const p256Curve = new SCJLECCUtils()
      expect(p256Curve.bntoHexString(bnNumber)).toEqual(numStr)
    })
  })
  describe('pointToHexString', () => {
    it('should work for point x=13, y=3012', () => {
      const x = new sjcl.bn('0x0D')
      const y = new sjcl.bn('0x0BC4')
      const p256Curve = new SCJLECCUtils()
      const myPoint = new sjcl.ecc.point(p256Curve.curve, x, y)
      const expected = expect(p256Curve.pointToHexString(myPoint)).toEqual(
        '0000000000000000000000000000000d000000000000000000000000000000bc4'
      )
    })
  })
  describe('byteArrayToHash', () => {
    it('')
  })
})

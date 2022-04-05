import { OPRF, ERR_BLIND_EMPTY_BUFFER } from '../OPRF'
import { TextEncoder } from 'util'
import * as sjcl from 'sjcl'

describe('OPRF', () => {
  const password1 = 'test1'

  describe("['rp1'] test with fixed exponent", () => {
    it('should produce the same result that the Go code produces', () => {
      const password = 'test1'
      const passwordData = Uint8Array.from(new TextEncoder().encode(password))
      console.log(OPRF.blind(passwordData).toString())
    })
  })

  describe('blind()', () => {
    it("should work with the password 'test1'", () => {
      const textEncoder = new TextEncoder()
      const passwordData = Uint8Array.from(textEncoder.encode(password1))
      const [blindingFactor, blindedData] = OPRF.blind(passwordData)
      expect(blindedData.byteLength).toBeGreaterThan(0)
    })
    it('should throw an error if called with an empty byte array', () => {
      expect(() => OPRF.blind(new ArrayBuffer(0))).toThrowError(ERR_BLIND_EMPTY_BUFFER)
    })
  })
})

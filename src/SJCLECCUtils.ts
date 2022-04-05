import * as sjcl from 'sjcl'
import { h2Curve, computeSWUCoordinates, getCurveParams, simplifiedSWU } from './h2c/h2c.js'

const P256_PRIME_ORDER = new sjcl.bn('0xffffffff00000000ffffffffffffffffbce6faada7179e84f3b9cac2fc632551')

export class SCJLECCUtils {
  private readonly _curve = sjcl.ecc.curves.c256
  private readonly h2cHash = sjcl.hash.sha256
  private readonly h2cMethod = 'swu'
  private readonly h2cLabel = 'H2C-P256-SHA256-SSWU-'

  constructor() {}

  get curve() {
    return { ...this._curve }
  }

  get curveSettings() {
    return {
      curve: this._curve,
      hash: this.h2cHash,
      method: this.h2cMethod,
      label: this.h2cLabel,
    }
  }

  randomScalar(): sjcl.BigNumber {
    return sjcl.bn.random(P256_PRIME_ORDER, 10)
  }

  bnToByteArray(number: sjcl.BigNumber): ArrayBuffer {
    const bn = number.toBits()
    return this.sjclBitsDecode(bn)
  }

  pointToByteArray(point: sjcl.SjclEllipticalPoint): ArrayBuffer {
    return this.sjclBitsDecode(point.toBits())
  }

  pointToHexString(point: sjcl.SjclEllipticalPoint): string {
    const convertedByteArray = this.sjclBitsDecode(point.toBits())
    return this.byteArraytoHexString(convertedByteArray)
  }

  byteArrayToBn(data: ArrayBuffer): sjcl.BigNumber {
    const numbers: number[] = [...new Uint8Array(data)]
    const bits = sjcl.codec.bytes.toBits(numbers)
    return sjcl.bn.fromBits(bits)
  }

  // TODO: rename this to hash2Curve
  pointFromByteArray(data: ArrayBuffer): sjcl.SjclEllipticalPoint {
    const numbers: number[] = [...new Uint8Array(data)]
    // const bits = sjcl.codec.bytes.toBits(numbers)
    return h2Curve(numbers, this.curveSettings)
  }

  sjclBitsDecode(data: sjcl.BitArray): ArrayBuffer {
    const bytes = sjcl.codec.bytes.fromBits(data)
    return new Uint8Array(bytes.length).map((chunk, index) => (chunk = bytes[index]))
  }

  byteArraytoHexString(bytes: ArrayBuffer): string {
    const uint8Bytes = new Uint8Array(bytes)
    const numArr: number[] = []
    uint8Bytes.forEach((x) => numArr.push(x))
    let hexString = numArr.map((x) => (x & 0xff).toString(16)).join('')
    return hexString
  }

  bntoHexString(bn: sjcl.BigNumber): string {
    const convertedBits = this.bnToByteArray(bn)
    return this.byteArraytoHexString(convertedBits)
  }
}

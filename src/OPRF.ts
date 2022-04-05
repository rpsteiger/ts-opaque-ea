import * as sjcl from 'sjcl'
import { SCJLECCUtils } from './SJCLECCUtils'

export const ERR_BLIND_EMPTY_BUFFER = 'error while blinding data: buffer passed is empty!'

export class OPRF {
  static blind(data: ArrayBuffer): [sjcl.BigNumber, ArrayBuffer] {
    if (data.byteLength === 0) {
      throw new Error(ERR_BLIND_EMPTY_BUFFER)
    }
    const p256Curve = new SCJLECCUtils()
    // TODO: switch back to randomScalar when you are done testing!
    // const blindingFactor = p256Curve.randomScalar()
    const blindingFactor = new sjcl.bn('0x4')
    const point = p256Curve.pointFromByteArray(data)
    const result = point.mult(blindingFactor)
    return [blindingFactor, p256Curve.pointToByteArray(result)]
  }
}

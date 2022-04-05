import crypto from 'crypto'

export class CryptoHelper {
  static randomBytes(n: number) {
    return new Uint8Array(crypto.randomBytes(n))
  }
}

import * as cf from './CFTypes'

const ERR_INVALID_BUFFER_LEN = 'Invalid buffer length: must be >=5 && <= 2^16-1 '

export class MarshalHelper {
  static createProtocolMessageFromB64(b64Data: string): cf.CFProtocolMessage {
    const buffer = Buffer.from(b64Data, 'base64')
    return MarshalHelper.createProtocolMessageFromByteArray(buffer)
  }

  static createProtocolMessageFromByteArray(data: Uint8Array): cf.CFProtocolMessage {
    if (data.byteLength < 4) {
      throw new Error(ERR_INVALID_BUFFER_LEN)
    }

    const buffer = Buffer.from(data)
    let offset = 0
    const messageType = buffer.readUInt8(offset++)
    const firstByte = buffer.readUInt8(offset++)
    const secondAndThirdByte = buffer.readUInt16BE(offset++)
    const messageLen = firstByte * 2 ** 16 + secondAndThirdByte
    console.log(`firstByte: ${firstByte}, secondAndThird:${secondAndThirdByte}, messageLen:${messageLen}`)
    if (messageLen >= 2 ** 24) {
      throw new Error(ERR_INVALID_BUFFER_LEN)
    }
    const resultBuffer = Buffer.alloc(messageLen)
    for (let i = 0; i < messageLen; i++) {
      resultBuffer.writeUInt8(buffer.readUInt8(offset++))
    }
    const protocolMessage = new cf.CFProtocolMessage(messageType as cf.CFProtocolMessageType, messageLen, resultBuffer)
    return protocolMessage
  }
}

export const errorCodes = { ERR_INVALID_BUFFER_LEN: ERR_INVALID_BUFFER_LEN }

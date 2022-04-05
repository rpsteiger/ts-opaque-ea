import { CFHTTPMessage, CFProtocolMessageType } from './CFTypes'
import { TextEncoder } from 'util'
import { OPRF } from './OPRF'

//
//       2                     2
// | userIDLen | userID | oprfDataLen | oprfData |.

export class RegistrationMessage {
  static createRegisterRequest(sessionId: ArrayBuffer, username: string, password: string): CFHTTPMessage {
    const textEncoder = new TextEncoder()
    const passwordData = Uint8Array.from(textEncoder.encode(password))
    // TODO: do something with blinding factor
    const [_, blindedData] = OPRF.blind(passwordData)
    const blindedPassword = new Uint8Array(blindedData)
    const bufferSize = 2 + username.length + 2 + blindedPassword.byteLength
    const buffer = Buffer.alloc(bufferSize)
    let offset = 0
    buffer.writeUInt16BE(username.length)
    offset = offset + 2
    username.split('').map((char) => {
      buffer.writeUInt8(char.charCodeAt(0), offset++)
    })
    buffer.writeUInt16BE(blindedPassword.byteLength, offset)
    offset = offset + 2
    blindedPassword.map((chunk) => buffer.writeUInt8(chunk, offset++))
    return new CFHTTPMessage(CFProtocolMessageType.ProtocolMessageTypeRegistrationRequest, sessionId, buffer)
  }
}

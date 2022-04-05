import { off } from 'node:process'

export const SESSION_ID_LENGTH: number = 32

export enum CFProtocolMessageType {
  ProtocolMessageTypeRegistrationRequest = 1,
  ProtocolMessageTypeRegistrationResponse = 2,
  ProtocolMessageTypeRegistrationUpload = 3,
  ProtocolMessageTypeCredentialRequest = 4,
  ProtocolMessageTypeCredentialResponse = 5,
  ProtocolMessageTypeClientRequest = 6,
  ProtocolMessageTypeClientResponse = 7,
  ProtocolMessageTypeServerResponse = 8,
}

export class CFProtocolMessage {
  messageType: CFProtocolMessageType
  messageBodyLen: number
  messageBody: Uint8Array

  constructor(newMessageType: CFProtocolMessageType, newMessageBodyLen: number, newMessageBody: Uint8Array) {
    this.messageType = newMessageType
    this.messageBodyLen = newMessageBodyLen
    this.messageBody = newMessageBody
  }
}

export class CFHTTPMessage {
  RequestID: ArrayBuffer
  RequestBody: ArrayBuffer

  toJSON() {
    return JSON.stringify({
      RequestID: Buffer.from(this.RequestID).toString('base64'),
      RequestBody: Buffer.from(this.RequestBody).toString('base64'),
    })
  }

  static createHTTPMessageFormat(messageType: CFProtocolMessageType, payload: ArrayBuffer): ArrayBuffer {
    const result = Buffer.alloc(payload.byteLength + 4)
    let offset = 0
    result.writeUInt8(messageType, offset++)
    // TODO: dont simply ignore this first byte
    result.writeUInt8(0x00, offset++)
    result.writeUInt16BE(payload.byteLength, offset)
    offset = offset + 2
    const payloadView = new Uint8Array(payload)
    payloadView.map((chunk) => result.writeUInt8(chunk, offset++))
    return new Uint8Array(result)
  }

  constructor(messageType: CFProtocolMessageType, sessionId: ArrayBuffer, newRequestBody: ArrayBuffer) {
    this.RequestID = sessionId
    this.RequestBody = CFHTTPMessage.createHTTPMessageFormat(messageType, newRequestBody)
  }
}

// replacer?: (this: any, key: string, value: any) => any

import { Session } from 'node:inspector'
import { CFProtocolMessage, CFProtocolMessageType, CFHTTPMessage } from '../CFTypes'

describe('CFProtocolMessage class', () => {
  describe('constructor()', () => {
    it('should not throw with valid params', () => {
      const messageType = CFProtocolMessageType.ProtocolMessageTypeClientRequest
      const messageBody = Buffer.from([0xa0, 0x73, 0xff])
      expect(() => new CFProtocolMessage(messageType, messageBody.length, messageBody)).not.toThrow()
    })
  })
})

describe('CFHTTPMessage class', () => {
  const shortSessionId = Buffer.from([
    0xc3,
    0x4e,
    0xd7,
    0x13,
    0x2a,
    0x59,
    0x70,
    0xf8,
    0xff,
    0x8c,
    0x73,
    0x61,
    0x94,
    0x5a,
    0x2a,
    0x39,
  ])
  const messageBody = Buffer.from([
    0x0a,
    0x3e,
    0x39,
    0x00,
    0xd4,
    0xd3,
    0x49,
    0x7d,
    0x8c,
    0xda,
    0x55,
    0x67,
    0x8d,
    0x33,
    0xea,
    0xa7,
    0xd9,
    0x02,
    0x06,
    0xa4,
    0x40,
    0x43,
    0x9f,
    0xcb,
    0x23,
    0x29,
    0xb8,
    0x59,
    0x2a,
    0x29,
    0x05,
    0x59,
  ])

  describe('constructor()', () => {
    it('should not throw with valid params', () => {
      expect(
        () =>
          new CFHTTPMessage(CFProtocolMessageType.ProtocolMessageTypeRegistrationRequest, shortSessionId, messageBody)
      ).not.toThrow()
    })
  })
  describe('toJSON', () => {
    const jsonActual = new CFHTTPMessage(
      CFProtocolMessageType.ProtocolMessageTypeRegistrationRequest,
      shortSessionId,
      messageBody
    ).toJSON()
    expect(() => JSON.parse(jsonActual)).not.toThrow()
  })
  describe('createHTTPMessageFormat', () => {
    it('should not throw with valid params', () => {
      const payload = Uint8Array.from([
        0x01,
        0x00,
        0x00,
        0x27,
        0x00,
        0x02,
        0x74,
        0x32,
        0x00,
        0x21,
        0x02,
        0x7b,
        0x0f,
        0x5c,
        0x11,
        0x1e,
        0x63,
        0xca,
        0x58,
        0x17,
        0x12,
        0xda,
        0x10,
        0x88,
        0xe4,
        0xb5,
        0xbd,
        0xdd,
        0x48,
        0x94,
        0x81,
        0x85,
        0x59,
        0xa7,
        0x37,
        0xd2,
        0xf0,
        0xc4,
        0xa8,
        0x5f,
        0x4d,
        0x61,
        0x2f,
      ])
      expect(() =>
        CFHTTPMessage.createHTTPMessageFormat(CFProtocolMessageType.ProtocolMessageTypeRegistrationRequest, payload)
      ).not.toThrow()
    })
  })
})

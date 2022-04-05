import { MarshalHelper, errorCodes } from '../MarshalHelper'
import { CFProtocolMessageType, CFProtocolMessage } from '../CFTypes'
import { getMaxProtocolMessageAsync } from '../test/test-protocol-messages'

describe('MarshalHelper', () => {
  describe('unmarshal register-request b64 data', () => {
    const validB64ProtocolMessage = 'AQAALwAKcnBzdGVpZ2VyMgAhA9HUKtGpqUtXOZIs+qQPJD5bfhBcTxKRUh1CLgG18Udn'
    it('should work when called with valid input', () => {
      const protocolMessage = MarshalHelper.createProtocolMessageFromB64(validB64ProtocolMessage)
      expect(protocolMessage.messageType).toBe(CFProtocolMessageType.ProtocolMessageTypeRegistrationRequest)
      expect(protocolMessage.messageBody.length).toBe(47)
    })
  })

  describe('unmarshal register-response b64 data', () => {
    const validB64RegisterReponsePayload =
      'AgAAyAAhAkTfzTkMc3L9Nzv9rEO1VgCdWkirRD17b3VzJJQMt/bgAJ4wgZswEAYHKoZIzj0CAQYFK4EEACMDgYYABAC4LPXq1HwKJpKR3lsgYtOBWhrhFNnWWwwZGQAVVyjlIUUfl0tLxBnkX83I6aJVhBNVh7uEkLTBMA8AXnQQQAOHPQASvOHpFZMSHExkuHfPF/Ew2ibae4Gdv36ad/J2qUP7A2hg6mm3hFqOHgswTgOLuWTDDBjlj/t/6o66CRKFIMOWxwEBAgMF'
    it('should work when called with valid input', () => {
      const protocolMessage = MarshalHelper.createProtocolMessageFromB64(validB64RegisterReponsePayload)
      expect(protocolMessage.messageType).toBe(CFProtocolMessageType.ProtocolMessageTypeRegistrationResponse)
      expect(protocolMessage.messageBody.length).toBe(200)
    })
  })

  describe('createProtocolMessageFromByteArray()', () => {
    it('should throw error when passed an empty array', () => {
      expect(() => MarshalHelper.createProtocolMessageFromByteArray(Buffer.alloc(0))).toThrowError(
        errorCodes.ERR_INVALID_BUFFER_LEN
      )
    })
    it('should work on max message size 2^24-1', (done: () => void) => {
      const tooLargeProtocolMessage = getMaxProtocolMessageAsync().then((data) => {
        expect(() => MarshalHelper.createProtocolMessageFromByteArray(data)).not.toThrowError(
          errorCodes.ERR_INVALID_BUFFER_LEN
        )
        done()
      })
    })
  })
})

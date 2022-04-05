import { MarshalHelper } from '../MarshalHelper'
import { CFProtocolMessage, CFProtocolMessageType } from '../CFTypes'
import { CryptoHelper } from '../CryptoHelper'
import * as cf from '../CFTypes'
import { RegistrationMessage } from '../RegistrationMessage'
import { randomPassword } from './TestHelper'

describe('RegistrationMessage', () => {
  describe('createRegisterRequest()', () => {
    it('should work given valid parameters', () => {
      const sessionId = CryptoHelper.randomBytes(cf.SESSION_ID_LENGTH)
      const username = randomPassword(12)
      const password = 'gopher'
      const registrationHttpMessage = RegistrationMessage.createRegisterRequest(sessionId, username, password)
      expect(registrationHttpMessage.RequestID.byteLength).toBe(cf.SESSION_ID_LENGTH)
      expect(registrationHttpMessage.RequestBody.byteLength).toBeGreaterThan(0)
    })
  })
})

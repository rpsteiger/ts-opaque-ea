import { CryptoHelper } from '../../CryptoHelper'
import { RegistrationMessage } from '../../RegistrationMessage'
import * as cf from '../../CFTypes'
import fetch, { ResponseInit, Response } from 'node-fetch'
import { MarshalHelper } from '../../MarshalHelper'
import { randomPassword } from '../TestHelper'
import { OPRF } from '../../OPRF'
import { TextEncoder } from 'util'

describe('register message (integration) test', () => {
  it('should return a response of type RegistrationResponse; params are random', (done: () => void) => {
    const sessionId = CryptoHelper.randomBytes(cf.SESSION_ID_LENGTH)
    const username = randomPassword(12)
    const password = randomPassword(8)
    const httpMessage = RegistrationMessage.createRegisterRequest(sessionId, username, password)
    const jsonData: string = httpMessage.toJSON()
    console.log('sending request', jsonData)
    fetch('http://localhost:8080/auth/register', { method: 'post', body: jsonData })
      .then((res: Response) => {
        res.buffer().then((rawRes) => {
          const protocolMessage = MarshalHelper.createProtocolMessageFromByteArray(rawRes)
          expect(protocolMessage.messageType).toBe(cf.CFProtocolMessageType.ProtocolMessageTypeRegistrationResponse)
          expect(protocolMessage.messageBodyLen).toBeGreaterThan(0)
          done()
        })
      })
      .catch((err) => {
        console.log(err)
        done()
        fail('error while connecting to opaque server')
      })
  })
})

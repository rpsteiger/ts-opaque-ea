import fs from 'fs'
import { CryptoHelper } from '../CryptoHelper'
import { CFProtocolMessage, CFProtocolMessageType } from '../CFTypes'

const TOO_LARGE_PM_FILEPATH = 'res/test/too-large-protocol-message.blob'

let maxProtocolMessageCache: Uint8Array | null = null

const tooLargeFilePath = () => `${__dirname}/../../${TOO_LARGE_PM_FILEPATH}`

export const getMaxProtocolMessageAsync: () => Promise<Uint8Array> = () => {
  return new Promise((resolve, reject) => {
    if (maxProtocolMessageCache) {
      resolve(maxProtocolMessageCache)
    } else {
      fs.exists(tooLargeFilePath(), (result) => {
        if (result) {
          // TODO : this part is duplicate :( and also needs simplification !!!
          readTooLargeProtocolMessageAsync()
            .then((data) => {
              maxProtocolMessageCache = data
              resolve(maxProtocolMessageCache)
            })
            .catch((err) => reject(err))
        } else {
          writeMaxProtocolMessageToFileAsync().then((itWorked) => {
            if (!itWorked) {
              reject(`couldn\'t write to file ${tooLargeFilePath()}`)
            } else {
              readTooLargeProtocolMessageAsync()
                .then((data) => {
                  maxProtocolMessageCache = data
                  resolve(maxProtocolMessageCache)
                })
                .catch((err) => reject(err))
            }
          })
        }
      })
    }
  })
}

const readTooLargeProtocolMessageAsync: () => Promise<Uint8Array> = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(tooLargeFilePath(), (err, result) => {
      if (err) reject(err)
      else resolve(result)
    })
  })
}

const writeMaxProtocolMessageToFileAsync: () => Promise<boolean> = () => {
  return new Promise((resolve, reject) => {
    const maxAddress = 2 ** 24 - 1
    const tooLargeBuffer = Buffer.alloc(maxAddress + 4)
    const randomData = CryptoHelper.randomBytes(maxAddress)
    let offset = 0
    tooLargeBuffer.writeUInt8(CFProtocolMessageType.ProtocolMessageTypeClientResponse, offset++)
    tooLargeBuffer.writeUInt8(0xff, offset++)
    tooLargeBuffer.writeUInt8(0xff, offset++)
    tooLargeBuffer.writeUInt8(0xff, offset++)
    randomData.map((chunk) => tooLargeBuffer.writeUInt8(chunk, offset++))
    fs.writeFile(tooLargeFilePath(), tooLargeBuffer, (err) => {
      if (err) reject(err)
      else resolve(true)
    })
  })
}

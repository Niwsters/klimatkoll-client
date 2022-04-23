import { StreamChannel } from '../stream'
import { expect } from './expect'

async function subscribes() {
  return new Promise(resolve => {
    const stream = new StreamChannel()
    stream.subscribe(value => {
      expect(value).toEqual(":D")
      resolve(null)
    })
    stream.next(":D")
  })
}

export default async function() {
  await subscribes()
}

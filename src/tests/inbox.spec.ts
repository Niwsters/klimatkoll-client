import { expect } from './expect'
import { inbox, send, receive } from '../inbox'

async function sleep(millis: number) {
  return new Promise(resolve => setTimeout(resolve, millis))
}

async function receivesMessage() {
  const inb = inbox<string>()
  send(inb, "oh hi")
  const msg = await receive(inb)
  expect(msg).toEqual("oh hi")
}

async function receivesMessageInOrder() {
  const inb = inbox<string>()
  send(inb, "oh hi")
  send(inb, ":D")
  expect(await receive(inb)).toEqual("oh hi")
}

async function awaitsMessageReceive() {
  const inb = inbox<string>()
  let received;
  receive<string>(inb).then(message => received = message)
  send(inb, "oh hi")
  await sleep(10)
  expect(received).toEqual("oh hi")
}

export default async function() {
  await receivesMessage()
  await receivesMessageInOrder()
  await awaitsMessageReceive()
}

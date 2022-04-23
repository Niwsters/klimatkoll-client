import { Socket } from './socket/socket'
import { EventToAdd } from './event/event'
import { EventStream } from './event/event-stream'
import { Canvas } from './canvas/canvas'
import { Resolution } from './root'
import { Environment } from './root/environment'
import { TextConfig } from '@shared/models'
import { Stream } from './stream'

export type Services = {
  environment: Environment,
  addEvent: (e: EventToAdd) => void,
  text: TextConfig,
  resolution$: Stream<Resolution>,
  events$: EventStream,
  canvas: Canvas,
  socket: Socket
}

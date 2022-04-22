import { Socket } from './socket/socket'
import { EventToAdd } from './event/event'
import { EventStream } from './event/event-stream'
import { Canvas } from './canvas/canvas'
import { UI } from './ui/UI'
import { Root } from './root'
import { Router } from './router'
import { Services } from './services'

export class App {
  private socket: Socket
  private eventStream: EventStream
  private canvas: Canvas

  private addEvent(e: EventToAdd) {
    this.eventStream.next(e)
  }

  constructor(
    root: Root
  ) {
    this.eventStream = new EventStream()
    const eventStream = this.eventStream

    this.canvas = new Canvas(root.frame.canvasElem)
    this.canvas.prepare(`${root.environment.httpServerURL}/${root.environment.language}`)
    this.canvas.events$.subscribe((event: EventToAdd) => eventStream.next(event))

    const addEvent = this.addEvent.bind(this)

    this.socket = new Socket(root.environment.wsServerURL, root.environment.language)
    this.socket.events$.subscribe((event: EventToAdd) => eventStream.next(event))
    eventStream.subscribe(e => this.socket.handleEvent(e))

    const services: Services = {
      addEvent,
      environment: root.environment,
      text: root.text,
      resolution$: root.resolution$,
      eventStream,
      canvas: this.canvas,
      socket: this.socket
    }

    const router = new Router(services)

    new UI(
      root.frame.uiElem,
      router.page$
    )

    root.resolution$.subscribe(resolution => this.canvas.resize(resolution.width, resolution.height))

    eventStream.subscribe(console.log)
  }
}

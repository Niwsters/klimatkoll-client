import { Socket, createSocket } from '../socket/socket'
import { EventToAdd, Event } from '../event/event'
import { EventStream } from '../event/event-stream'
import { Canvas } from '../canvas/canvas'
import { UI } from './UI'
import { Root } from '../root'
import { Router } from '../router'
import { PageFactory, Services } from '../pages'
import { MultiPlayerServer } from 'socket/multiplayer-server'

export class App {
  private readonly socket: Socket
  private readonly events$: EventStream
  private readonly canvas: Canvas
  private readonly router: Router

  private addEvent(e: EventToAdd) {
    this.events$.next(e)
  }

  private handleEvent(e: Event) {
    this.router.handleEvent(e)
  }

  constructor(root: Root, socket: Socket) {
    this.socket = socket
    this.events$ = new EventStream()
    const events$ = this.events$

    this.canvas = new Canvas(root.frame.canvasElem)
    this.canvas.prepare(`${root.environment.httpServerURL}/${root.environment.language}`)
    this.canvas.events$.subscribe((event: EventToAdd) => events$.next(event))

    const addEvent = this.addEvent.bind(this)

    this.socket.events$.subscribe((event: EventToAdd) => events$.next(event))
    events$.subscribe(e => this.socket.handleEvent(e))

    const mpServer = new MultiPlayerServer(socket)

    const services: Services = {
      addEvent,
      environment: root.environment,
      text: root.text,
      resolution$: root.resolution$,
      events$,
      canvas: this.canvas,
      socketID: this.socket.socketID,
      mpServer: mpServer.inbox
    }
    this.router = new Router(new PageFactory(services))

    events$.subscribe(e => this.handleEvent(e))

    new UI(
      root.frame.uiElem,
      this.router.page$
    )

    root.resolution$.subscribe(resolution => this.canvas.resize(resolution.width, resolution.height))
  }
}

export async function createApp(root: Root) {
  const socket = await createSocket(root.environment.wsServerURL, root.environment.language)
  return new App(root, socket)
}

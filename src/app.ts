import { Socket } from './socket/socket'
import { Event, EventToAdd } from './event/event'
import { EventStream } from './event/event-stream'
import { Canvas } from './canvas/canvas'
import { BehaviorSubject } from 'rxjs'
import { UI } from './ui/UI'
import { Resolution, Root } from './root'
import { Router } from './router'
import { Environment } from './root/environment'
import { TextConfig } from './models/text-config'
import { Stream } from './stream'

export type Services = {
  environment: Environment,
  addEvent: (e: EventToAdd) => void,
  text: TextConfig,
  resolution$: Stream<Resolution>,
  eventStream: EventStream,
  canvas: Canvas,
  socket: Socket
}

export class AppState {
  readonly currentPage: string

  constructor(currentPage: string = "menu") {
    this.currentPage = currentPage
  }

  private static changeRouter(_: AppState, router: string): AppState {
    return new AppState(router)
  }

  static room_joined(state: AppState, _: Event): AppState {
    return AppState.changeRouter(state, "game")
  }

  static leave_game(state: AppState, _: Event): AppState {
    return AppState.changeRouter(state, "menu")
  }

  static game_removed(state: AppState, _: Event): AppState {
    return AppState.changeRouter(state, "menu")
  }
}

export class App {
  private socket: Socket
  private eventStream: EventStream
  private canvas: Canvas
  private state$: BehaviorSubject<AppState>

  private get state(): AppState {
    return this.state$.value
  }

  private set state(newState: AppState) {
    this.state$.next(newState)
  }

  private addEvent(e: EventToAdd) {
    this.eventStream.next(e)
  }

  private getEventHandler(event: Event): any {
    return (AppState as any)[event.event_type]
  }

  private handleEvent(event: Event): void {
    const func = this.getEventHandler(event)
    if (func)
      this.state = func(this.state, event)
  }

  constructor(
    root: Root
  ) {
    this.state$ = new BehaviorSubject(new AppState())
    this.eventStream = new EventStream()
    const eventStream = this.eventStream

    this.canvas = new Canvas(root.frame.canvasElem)
    this.canvas.prepare(`${root.environment.httpServerURL}/${root.environment.language}`)
    this.canvas.events$.subscribe((event: EventToAdd) => eventStream.next(event))
    eventStream.subscribe(e => this.handleEvent(e))

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

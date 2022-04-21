import { Socket } from './socket/socket'
import { GameState } from './game/gamestate'
import { Game } from './game/game'
import { Event, EventToAdd } from './event/event'
import { EventStream } from './event/event-stream'
import { Canvas } from './canvas/canvas'
import { BehaviorSubject } from 'rxjs'
import { UI } from './ui/UI'
import { AppConfig } from './app-config'
import { desiredWidth, desiredHeight } from './desired-resolution'
import { root } from './root'

export class AppState {
  readonly currentPage: string

  constructor(currentPage: string = "menu") {
    this.currentPage = currentPage
  }

  private static changePage(_: AppState, page: string): AppState {
    return new AppState(page)
  }

  static room_joined(state: AppState, _: Event): AppState {
    return AppState.changePage(state, "game")
  }

  static leave_game(state: AppState, _: Event): AppState {
    return AppState.changePage(state, "menu")
  }

  static game_removed(state: AppState, _: Event): AppState {
    return AppState.changePage(state, "menu")
  }
}

export class App {
  private socket: Socket
  private game: Game
  private eventStream: EventStream
  private ui: UI
  private config: AppConfig
  private canvas: Canvas
  private state$: BehaviorSubject<AppState>
  private gamestate$: BehaviorSubject<GameState>
  private width$: BehaviorSubject<number>

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

  private resize(width: number, height: number) {
    this.width$.next(width)
    this.canvas.resize(width, height)
  }

  constructor(
    config: AppConfig,
    canvasElem: HTMLCanvasElement,
    uiElem: HTMLElement,
    width: number
  ) {
    this.config = config
    this.state$ = new BehaviorSubject(new AppState())
    this.width$ = new BehaviorSubject(width)
    this.eventStream = new EventStream()
    const eventStream = this.eventStream

    this.socket = new Socket(config.wsServerURL, config.language)
    this.socket.events$.subscribe((event: EventToAdd) => eventStream.next(event))

    this.game = new Game(config)
    this.game.events$.subscribe((event: EventToAdd) => eventStream.next(event))
    this.gamestate$ = this.game.state$

    this.canvas = new Canvas(canvasElem)
    this.canvas.prepare(`${this.config.httpServerURL}/${this.config.language}`)
    this.canvas.events$.subscribe((event: EventToAdd) => eventStream.next(event))

    eventStream.subscribe((e: Event) => {
      this.socket.handleEvent(e)
      this.game.handleEvent(e)
      this.handleEvent(e)
    })

    this.ui = new UI(
      uiElem,
      this.config,
      this.state$,
      this.gamestate$,
      this.width$,
      this.addEvent.bind(this)
    )

    this.resize(desiredWidth(root()), desiredHeight(root()))
    window.addEventListener('resize', () => {
      this.resize(desiredWidth(root()), desiredHeight(root()))
    }, false)

    setInterval(() => {
      const gamestate = this.gamestate$.value
      this.canvas.render(gamestate)
      this.gamestate$.next(gamestate.update(Date.now()))
    }, 1000/60)
  }
}

import React from 'react'
import { TextConfig } from './models/text-config'
import { Socket } from './socket/socket'
import { GameState } from './game/gamestate'
import { Game } from './game/game'
import { Event, EventToAdd } from './event/event'
import { EventStream } from './event/event-stream'
import { Canvas } from './canvas/canvas'
import { BehaviorSubject } from 'rxjs'
import { UIComponent } from './ui/UI'
import { Root } from './root'
import ReactDOM from 'react-dom'

export class AppConfig {
  devMode: boolean
  language: string
  text: TextConfig

  get baseURL(): string {
    if (this.devMode === true)
      return "localhost:3000"

    return "spela.kortspeletklimatkoll.se"
  }

  get httpServerURL(): string {
    if (this.devMode === true) {
      return `http://${this.baseURL}`
    }

    return `https://${this.baseURL}`
  }

  get wsServerURL(): string {
    if (this.devMode === true) {
      return `ws://${this.baseURL}`
    }

    return `wss://${this.baseURL}`
  }

  constructor(devMode: boolean, language: string, text: TextConfig) {
    this.devMode = devMode
    this.language = language
    this.text = text
  }
}

export class AppState {
  currentPage: string = "menu"
  statusMessage: string = ""
  roomID: string = ""

  private static changePage(state: AppState, page: string): AppState {
    return {
      ...state,
      currentPage: page
    }
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

export function renderUI(uiElem: HTMLElement, text: TextConfig, root: Root) {
  const config = new AppConfig(root.devMode, root.language, text);
  const app = new App(config)
  ReactDOM.render(
    app.renderUI(),
    uiElem
  )
}

export class App {
  socket: Socket
  game: Game
  eventStream: EventStream
  config: AppConfig
  canvas: Canvas
  state$: BehaviorSubject<AppState>
  gamestate$: BehaviorSubject<GameState>

  get state(): AppState {
    return this.state$.value
  }

  set state(newState: AppState) {
    this.state$.next(newState)
  }

  constructor(config: AppConfig) {
    this.config = config
    this.state$ = new BehaviorSubject(new AppState())
    this.eventStream = new EventStream()
    const eventStream = this.eventStream

    this.socket = new Socket(config)

    this.socket.events$.subscribe((event: EventToAdd) => eventStream.next(event))
    this.socket.events$.subscribe((event: EventToAdd) => console.log("From server:", event))

    this.game = new Game(config)
    this.game.events$.subscribe((event: EventToAdd) => eventStream.next(event))
    this.game.events$.subscribe((event: EventToAdd) => console.log("From GameState:", event))
    this.gamestate$ = this.game.state$

    this.canvas = new Canvas()
    this.canvas.prepare(`${this.config.httpServerURL}/${this.config.language}`)
    this.canvas.events$.subscribe((event: EventToAdd) => eventStream.next(event))

    eventStream.subscribe((e: Event) => {
      this.socket.handleEvent(e)
      this.game.handleEvent(e)
      this.handleEvent(e)
    })

    setInterval(() => {
      const gamestate = this.gamestate$.value
      this.canvas.render(gamestate)
      this.gamestate$.next(gamestate.update(Date.now()))
    }, 1000/60)

  }

  addEvent(e: EventToAdd) {
    this.eventStream.next(e)
  }

  handleEvent(event: Event): void {
    const func: ((state: AppState, e: Event) => AppState) | undefined = (AppState as any)[event.event_type]
    if (func)
      this.state = func(this.state, event)
  }

  renderUI() {
    return <UIComponent 
      config={this.config}
      state$={this.state$}
      gamestate$={this.gamestate$}
      addEvent={this.addEvent.bind(this)}
      />;
  }
}

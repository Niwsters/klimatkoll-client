import React, { Component } from 'react'
import { TextConfig } from './models/text-config'
import { Socket } from './socket/socket'
import { GameState } from './game/gamestate'
import { Game } from './game/game'
import { Event, EventToAdd } from './event/event'
import { EventStream } from './event/event-stream'
import { Menu } from './ui/Menu'
import { StatusBar } from './ui/StatusBar'
import { UserInput } from './ui/user-input'
import { Canvas } from './canvas/canvas'
import { Observable, BehaviorSubject } from 'rxjs'

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

  room_joined(e: Event): AppState {
    return {
      ...this,
      currentPage: "game"
    }
  }
}

export class App {
  socket: Socket
  game: Game
  eventStream: EventStream
  userInput: UserInput
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
    this.socket.events$.subscribe((event: Event) => eventStream.next(event))

    this.game = new Game()
    this.game.events$.subscribe((event: EventToAdd) => eventStream.next(event))
    this.gamestate$ = this.game.state$

    this.userInput = new UserInput()
    this.userInput.events$.subscribe((event: EventToAdd) => eventStream.next(event))

    this.canvas = new Canvas()
    this.canvas.prepare(`${this.config.httpServerURL}/${this.config.language}`)

    eventStream.subscribe((e: Event) => {
      this.socket.handleEvent(e)
      this.game.handleEvent(e)
      this.userInput.handleEvent(e)
      this.handleEvent(e)
      console.log("Event stream: ", e)
    })

    //this.gamestate$.subscribe((g: any) => console.log("GameState: ", g))

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
    const func: ((e: Event) => AppState) | undefined = (this.state as any)[event.event_type]
    if (func)
      this.state = func(event)
  }

  render() {
    return <AppComponent 
      config={this.config}
      state$={this.state$}
      gamestate$={this.gamestate$}
      addEvent={this.addEvent.bind(this)}
      />;
  }
}

interface Props {
  config: AppConfig
  state$: BehaviorSubject<AppState>
  gamestate$: Observable<GameState>
  addEvent: (e: EventToAdd) => void
}

interface State {
  appstate: AppState,
  gamestate: GameState
}

export class AppComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      appstate: props.state$.value,
      gamestate: new GameState()
    }
  }

  componentDidMount() {
    this.props.state$.subscribe(appstate => {
      this.setState({ appstate: appstate })
    })

    this.props.gamestate$.subscribe(gamestate => {
      this.setState({ gamestate: gamestate })
    })
  }

  render() {
    const props = this.props
    const config = props.config
    const addEvent = props.addEvent
    const state = this.state.appstate
    const gamestate = this.state.gamestate

    const canvas = document.getElementById('klimatkoll-canvas')
    if (!canvas)
      throw new Error("Can't find canvas with ID: klimatkoll-canvas")

    if (!state)
      return "";

    let page: any = ""
    let statusBar: any = ""
    switch(state.currentPage) {
      case "menu": {
        canvas.style.display = 'none'
        page = <Menu
          config={config}
          addEvent={addEvent} />;
        break;
      }
      case "game":
        page = ''
        canvas.style.display = 'block'
        statusBar = <StatusBar
          gamestate={gamestate}
          config={config}
          addEvent={addEvent} />
        break;
    }

    return (
      <div id="app">
        <div style={{ display: "block", height: "100%" }}>
          { page }
        </div>
        <link rel="stylesheet" href={config.httpServerURL + "/styles.css"} />
        { statusBar }
      </div>
    );
  }
}

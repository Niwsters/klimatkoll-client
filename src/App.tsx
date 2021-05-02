import React, { Component } from 'react'
import { BehaviorSubject } from 'rxjs'
import { vec2 } from 'gl-matrix'

import { ClientEvent, ServerEvent, ServerCommand, GameState } from './game/gamestate'
import { Card } from './game/card'
import { Canvas } from './canvas/canvas'
import { cards } from './cards'
import { Mouse } from './game/mouse'
import { Menu } from './ui/Menu'
import { DebugConsole } from './devtools/console'

// Initialise outside constructor to avoid reconnecting socket due to ReactJS stuff
const socket = new WebSocket('ws://localhost:4200', 'echo-protocol')

class App extends Component<{}, {
  currentPage: string,
  notification: string,
  showNotification: boolean,
  canvasElem?: HTMLCanvasElement
}> {

  events$: BehaviorSubject<ClientEvent[]> = new BehaviorSubject<ClientEvent[]>([])
  socketID?: number
  roomID?: string
  timeout?: ReturnType<typeof setTimeout>
  handledServerEventIDs: Set<number> = new Set<number>()
  hoveredCardIDs: Set<number> = new Set<number>()

  addServerEvents(events: ServerEvent[]) {
    const clientEvents = [...this.events$.value]

    events.forEach((e: ServerEvent, i: number) => {
      if (!this.handledServerEventIDs.has(e.event_id)) {
        this.handledServerEventIDs.add(e.event_id)
        clientEvents.push({
          ...e,
          event_id: clientEvents.length + i,
          timestamp: Date.now()
        })
      }
    })

    this.events$.next(clientEvents)
  }

  addClientEvent(event_type: string, payload: any = {}) {
    const clientEvents = GameState.addClientEvent(
      this.events$.value,
      Date.now(),
      event_type,
      payload)
    this.events$.next(clientEvents)
  }

  constructor(props: {}) {
    super(props)

    socket.onopen = (e: Event) => {
      console.log("Socket connected!")
    }

    DebugConsole.setupCommands(this.events$)

    socket.onmessage = (e: MessageEvent) => {
      const event = JSON.parse(e.data)
      console.log(event)
      switch(event.type) {
        case "socketID": {
          this.socketID = event.payload
          this.addClientEvent("socket_id", { socketID: this.socketID })
          break
        }
        case "room_joined": {
          this.roomID = event.payload.roomID
          this.notify("Gick med i spel med ID: " + this.roomID)
          this.setState({ currentPage: 'game' })
          break
        }
        case "room_full": {
          const roomID = event.payload
          this.notify("Kan inte gå med i rum: Rummet är fullt")
          break
        }
        case "room_exists": {
          this.notify("Kunde inte skapa rum: Rum med samma ID existerar redan")
          break
        }
        case "room_left": {
          const socketID = event.payload.socketID
          if (socketID == this.socketID) {
            this.notify("Lämnade spelet")
          } else {
            this.notify("Andra spelaren lämnade spelet")
          }
          break
        }
        case "new_game": {
          // TODO: On new game => reset game events?
          break
        }
        case "events": {
          this.addServerEvents(event.payload)
          break
        }
      }
    }

    this.state = {
      currentPage: 'menu',
      notification: '',
      showNotification: false
    }
  }

  sendCommand(command: ServerCommand) {
    socket.send(JSON.stringify(command))
  }

  joinGame(roomID: string) {
    this.sendCommand({
      "context": "menu",
      "type": "join_game",
      "payload": {
        "roomID": roomID
      }
    })
  }

  createGame(roomID: string) {
    this.sendCommand({
      "context": "menu",
      "type": "create_game",
      "payload": {
        "roomID": roomID
      }
    })
  }

  notify(msg: string) {
    this.setState({
      notification: msg,
      showNotification: true
    })

    if (this.timeout) clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      this.setState({ showNotification: false })
    }, 1000)
  }

  componentDidMount() {
    const canvasElem = document.getElementById("klimatkoll-canvas") as HTMLCanvasElement
    if (!canvasElem) throw new Error("Element with ID 'klimatkoll-canvas' not found")
    canvasElem.onmousemove = (e: MouseEvent) => {
      const elem = e.target as HTMLElement
      if (!elem) throw new Error("e.target is null")
      const rect = elem.getBoundingClientRect()
      const mousePosition = vec2.fromValues(e.clientX - rect.left, e.clientY - rect.top)
      const state = GameState.fromEvents(this.events$.value)

      const result = Mouse.onMoved(
        state,
        this.hoveredCardIDs,
        mousePosition,
        this.events$.value,
        Date.now())

      this.events$.next(result.clientEvents)
      this.hoveredCardIDs = result.hoveredCardIDs
    }
    canvasElem.onclick = (e: MouseEvent) => {
      const elem = e.target as HTMLElement
      if (!elem) throw new Error("e.target is null")
      const rect = elem.getBoundingClientRect()
      const mousePosition = vec2.fromValues(e.clientX - rect.left, e.clientY - rect.top)

      const state = GameState.fromEvents(this.events$.value)
      const command = Mouse.onClicked(state, mousePosition, this.events$.value, Date.now())
      this.events$.next(command.clientEvents)
      if (command.serverCommand) {
        this.sendCommand(command.serverCommand)
      }
    }

    this.setState({ canvasElem: canvasElem })

    const canvas = new Canvas(canvasElem)
    canvas.prepare().then(() => {
      setInterval(() => {
        const state = GameState.fromEvents(this.events$.value)
        canvas.render(state)
      }, 1000/60)
    })
  }

  render() {
    const currentPage = this.state.currentPage
    const events$ = this.events$
    const notificationMsg = this.state.notification
    const showNotification = this.state.showNotification
    const canvasElem = this.state.canvasElem

    return (
      <div id="app">
        <div className={'notification' + (showNotification ? ' show' : '')}>
          { notificationMsg }
        </div>
        <div style={{ display: currentPage === "menu" ? "block" : "none", height: "100%" }}>
          <Menu
            joinGame={this.joinGame.bind(this)}
            createGame={this.createGame.bind(this)} />
        </div>
        <canvas
          style={{ display: currentPage === "game" ? "block" : "none" }}
          id="klimatkoll-canvas"
          width="960"
          height="540" />
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react'
import { BehaviorSubject, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { vec2 } from 'gl-matrix'

import { GameState, ServerCommand } from './game/gamestate'
import { Event, ServerEvent } from './game/event'
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
  commands$: BehaviorSubject<Event[]> = new BehaviorSubject<Event[]>([])
  serverEvents$: BehaviorSubject<Event[]> = new BehaviorSubject<Event[]>([])
  streams$: BehaviorSubject<Event[]>[] = [this.commands$, this.serverEvents$]
  events$: Observable<Event[]>
  events: Event[] = []
  socketID?: number
  roomID?: string
  timeout?: ReturnType<typeof setTimeout>
  handledServerEventIDs: Set<number> = new Set<number>()
  hoveredCardIDs: Set<number> = new Set<number>()

  getGameState() {
    return GameState.fromEvents(this.events) 
  }

  // This is required to keep track of when server events were received
  addServerEvents(events: ServerEvent[]) {
    const newEvents = events
      .filter(event => !this.handledServerEventIDs.has(event.event_id))
      .map(event => {
        return {
          ...event,
          timestamp: Date.now()
        }
      })

    events.forEach(event => {
      this.handledServerEventIDs.add(event.event_id)
    })

    this.serverEvents$.next([
      ...this.serverEvents$.value,
      ...newEvents
    ])
  }

  addCommand(command: Event) {
    const state = this.getGameState()
    switch(command.event_type) {
      case "mouse_clicked": {
        const focusedCard = GameState.getFocusedCard(state)
        if (state.isMyTurn && state.selectedCardID && focusedCard && focusedCard.isSpace) {
          const position = state.emissionsLineCardOrder.findIndex(cardID => focusedCard.id === cardID)
          this.sendCommand({
            context: "game",
            type: "card_played_from_hand",
            payload: {
              cardID: state.selectedCardID,
              position: position
            }
          })
        }
      }
    }

    this.commands$.next([
      ...this.commands$.value,
      {
        ...command,
        event_id: this.commands$.value.length
      }
    ])
  }

  constructor(props: {}) {
    super(props)

    socket.onopen = e => {
      console.log("Socket connected!")
    }

    this.events$ = Event
      .from([this.serverEvents$, this.commands$])
      .observable()
    DebugConsole.setupCommands(this.serverEvents$, this.commands$)

    /*
    this.events$.subscribe(events => {
      console.log(events)
      console.log(GameState.fromEvents(events))
    })
    */

    socket.onmessage = (e: MessageEvent) => {
      const event = JSON.parse(e.data)
      console.log(event)
      switch(event.type) {
        case "socketID": {
          this.socketID = event.payload
          this.addCommand({
            event_id: Math.random(),
            event_type: "socket_id",
            payload: {
              "socketID": this.socketID
            },
            timestamp: Date.now()
          })
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
      const state = this.getGameState()

      const result = Mouse.onMoved(
        state,
        this.hoveredCardIDs,
        mousePosition,
        Date.now())

      result.events.forEach(event => this.addCommand(event))
      this.hoveredCardIDs = result.hoveredCardIDs
    }
    canvasElem.onclick = (e: MouseEvent) => {
      const elem = e.target as HTMLElement
      if (!elem) throw new Error("e.target is null")
      const rect = elem.getBoundingClientRect()
      const mousePosition = vec2.fromValues(e.clientX - rect.left, e.clientY - rect.top)

      const state = this.getGameState()
      this.addCommand({
        event_type: "mouse_clicked",
        payload: {
          position: mousePosition
        },
        timestamp: Date.now()
      })
      /*
      if (command.serverCommand) {
        this.sendCommand(command.serverCommand)
      }
      */
    }

    this.setState({ canvasElem: canvasElem })

    const canvas = new Canvas(canvasElem)
    canvas.prepare().then(() => {
      setInterval(() => {
        this.events = Event
          .from(this.streams$)
          .get()
        const state = this.getGameState()
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

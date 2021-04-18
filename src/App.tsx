import React, { Component } from 'react'
import { BehaviorSubject } from 'rxjs'
import { vec2 } from 'gl-matrix'

import { ClientEvent, GameState } from './game/gamestate'
import { Card } from './game/card'
import { Canvas } from './canvas/canvas'
import { cards } from './cards'
import { Mouse } from './game/mouse'
import { Game } from './Game'
import { Menu } from './ui/Menu'
import { DebugConsole } from './devtools/console'

interface ServerEvent {
  event_id: number
  event_type: string
  payload: any
}

// Initialise outside constructor to avoid reconnecting socket due to ReactJS stuff
const socket = new WebSocket('ws://localhost:4200', 'echo-protocol')

class App extends Component<{}, {
  currentPage: string,
  notification: string,
  showNotification: boolean
}> {

  events$: BehaviorSubject<ClientEvent[]> = new BehaviorSubject<ClientEvent[]>([])
  socketID?: number
  roomID?: string
  timeout?: ReturnType<typeof setTimeout>
  handledServerEventIDs: Set<number> = new Set<number>()

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
          const clientEvents = [
            ...this.events$.value,
            {
              event_id: this.events$.value.length,
              event_type: "socket_id",
              payload: {
                socketID: this.socketID
              },
              timestamp: Date.now()
            }
          ]
          this.events$.next(clientEvents)

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
          const clientEvents = [...this.events$.value]
          event.payload.forEach((e: ServerEvent, i: number) => {
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

  sendToSocket(data: Object) {
    socket.send(JSON.stringify(data))
  }

  joinGame(roomID: string) {
    this.sendToSocket({
      "context": "menu",
      "type": "join_game",
      "payload": {
        "roomID": roomID
      }
    })
  }

  createGame(roomID: string) {
    this.sendToSocket({
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

  render() {
    const currentPage = this.state.currentPage
    const events$ = this.events$
    const notificationMsg = this.state.notification
    const showNotification = this.state.showNotification

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
        <Game events$={events$} />
      </div>
    );
  }
}

export default App;

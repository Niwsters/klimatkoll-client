import React, { Component } from 'react'
import { BehaviorSubject } from 'rxjs'
import { vec2 } from 'gl-matrix'

import { ClientEvent, GameState } from './game/gamestate'
import { Card } from './game/card'
import { Canvas } from './canvas/canvas'
import { cards } from './cards'
import { Mouse } from './ui/mouse'
import { Game } from './Game'
import { Menu } from './ui/Menu'

class App extends Component<{}, { currentPage: string }> {

  events$: BehaviorSubject<ClientEvent[]> = new BehaviorSubject<ClientEvent[]>([])

  constructor(props: {}) {
    super(props)

    const events: ClientEvent[] = [
      {
        event_id: 0,
        event_type: 'waiting_for_players',
        payload: {},
        timestamp: Date.now()
      },
      {
        event_id: 1,
        event_type: 'playing',
        payload: {},
        timestamp: Date.now()
      },
      {
        event_id: 2,
        event_type: 'draw_card',
        payload: {
          card: { name: 'bussresa-malmo-chamonix', emissions: 60, id: 7 },
          socketID: 0,
        },
        timestamp: Date.now()
      }
    ]

    this.events$.next(events)

    this.state = {
      currentPage: 'menu'
    }
  }

  render() {
    const currentPage = this.state.currentPage
    const events$ = this.events$

    return (
      <div id="app">
        <div style={{ display: currentPage === "menu" ? "block" : "none", height: "100%" }}>
          <Menu
            joinGame={(roomID: string) => this.setState({ currentPage: 'game'})}
            createGame={(roomID: string) => this.setState({ currentPage: 'game'})} />
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

import React from 'react'
import { Services } from '../services';
import { Card } from '../game/card';
import { Game } from '../game/game';
import { StatusBar } from '../ui/components/StatusBar';
import { Page } from '../pages/page'

export class GamePage implements Page {
  readonly component: React.ReactElement 

  private readonly game: Game

  constructor(services: Services) {
    const { text, addEvent, resolution$ } = services
    this.game = new Game(text, services.socket.socketID)
    this.game.events$.subscribe(addEvent)

    services.events$.subscribe(event => {
      this.game.handleEvent(event)
    })

    setInterval(() => {
      services.canvas.render(this.cards)
      this.game.update(Date.now())
    }, 1000/60)

    this.component = <StatusBar
      text={text}
      gamestate={this.game.state}
      addEvent={addEvent}
      resolution$={resolution$}
    ></StatusBar>
  }

  get cards(): Card[] {
    return this.game.state.cards
  }
}

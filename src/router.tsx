import React from 'react'
import { Services } from './app';
import { Event } from './event/event';
import { Card } from './game/card';
import { Game } from './game/game';
import { Stream, StreamSource } from './stream'
import { Menu } from './ui/components/Menu'
import { StatusBar } from './ui/components/StatusBar';

export interface Page {
  readonly component: React.ReactElement
  readonly cards: Card[]
}

class MenuPage implements Page {
  readonly component: React.ReactElement 
  readonly cards: Card[]

  constructor(services: Services) {
    const { text, environment, resolution$, addEvent } = services

    this.cards = []

    this.component = <Menu
      text={text}
      httpServerURL={environment.httpServerURL}
      resolution$={resolution$}
      addEvent={addEvent}>
    </Menu>
  }
}

class GamePage implements Page {
  readonly component: React.ReactElement 

  private readonly game: Game

  constructor(services: Services) {
    const { text, addEvent, resolution$ } = services
    this.game = new Game(text, services.socket.socketID)
    this.game.events$.subscribe(addEvent)

    services.eventStream.subscribe(event => {
      this.game.handleEvent(event)
    })

    setInterval(() => {
      services.canvas.render(this.cards)
      const gamestate = this.game.state$.value
      this.game.state$.next(gamestate.update(Date.now()))
    }, 1000/60)

    this.component = <StatusBar
      text={text}
      gamestate={this.game.state$.value}
      addEvent={addEvent}
      resolution$={resolution$}
    ></StatusBar>
  }

  get cards(): Card[] {
    return this.game.state$.value.cards
  }
}

export class Router {
  private readonly _page$: StreamSource<Page>;

  constructor(
    services: Services
  ) {
    const page = new MenuPage(services)

    services.eventStream.subscribe((event: Event) => {
      let page: Page | undefined = undefined
      switch (event.event_type) {
        case "room_joined": {
          page = new GamePage(services)
          break;
        }
      }
      if (page !== undefined)
        this._page$.next(page)
    })

    this._page$ = new StreamSource(page)
  }

  get page$(): Stream<Page> {
    return this._page$
  }

  get cards(): Card[] {
    return this._page$.value.cards
  }
}

import React from 'react'
import { Card } from 'core/card';
import { Game } from './game';
import { StatusBar } from './UI';
import { Page } from '../../pages/page'
import { TextConfig } from '@shared/models';
import { AddEventFunc } from '@shared/models';
import { Resolution } from 'root';
import { Stream } from '../../stream'
import { Event } from '@shared/events';

export class MPGamePage implements Page {
  readonly component: React.ReactElement 

  private readonly game: Game

  constructor(
    text: TextConfig,
    addEvent: AddEventFunc,
    resolution$: Stream<Resolution>,
    socketID: number,
    events$: Stream<Event>
  ) {
    this.game = new Game(text, socketID)
    this.game.events$.subscribe(addEvent)

    events$.subscribe(event => {
      this.game.handleEvent(event)
    })

    setInterval(() => {
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

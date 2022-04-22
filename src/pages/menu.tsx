import React from 'react'
import { Services } from '../app';
import { Card } from '../game/card';
import { Menu } from '../ui/components/Menu'
import { Page } from '../pages/page'

export class MenuPage implements Page {
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

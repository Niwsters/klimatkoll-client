import React from 'react'
import { Services } from '../../services';
import { ICard } from '@shared/models';
import { Menu } from './UI'
import { Page } from '../../pages/page'

export class MenuPage implements Page {
  readonly component: React.ReactElement 
  readonly cards: ICard[]

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

import React from 'react'
import { AddEventFunc, ICard, TextConfig } from '@shared/models';
import { Menu } from './UI'
import { Page } from '../../pages/page'
import { Environment } from 'root/environment';
import { Resolution } from 'root';
import { Stream } from '../../stream'
import { Inbox } from 'inbox';
import { EventToAdd } from '@shared/events';

export class MenuPage implements Page {
  readonly component: React.ReactElement 
  readonly cards: ICard[]

  constructor(
    text: TextConfig,
    environment: Environment,
    resolution$: Stream<Resolution>,
    mpServer: Inbox<EventToAdd>,
    addEvent: AddEventFunc
  ) {
    this.cards = []

    this.component = <Menu
      text={text}
      httpServerURL={environment.httpServerURL}
      resolution$={resolution$}
      mpServer={mpServer}
      addEvent={addEvent}
    >
    </Menu>
  }
}

import React from 'react'
import { ICard, TextConfig } from '@shared/models';
import { Menu } from './UI'
import { Page } from '../../pages/page'
import { AddEventFunc } from './UI/add-event';
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
    addEvent: AddEventFunc,
    mpServer: Inbox<EventToAdd>
  ) {
    this.cards = []

    this.component = <Menu
      text={text}
      httpServerURL={environment.httpServerURL}
      resolution$={resolution$}
      mpServer={mpServer}
      addEvent={addEvent}>
    </Menu>
  }
}

import { Page } from '../pages/page'
import { MenuPage } from '../pages/menu'
import { GamePage } from '../pages/game'

import { TextConfig } from '@shared/models'
import { EventToAdd } from '../event/event'
import { EventStream } from '../event/event-stream'
import { Canvas } from '../canvas/canvas'
import { Resolution } from '../root'
import { Environment } from '../root/environment'
import { Stream } from '../stream'
import { Inbox } from 'inbox'

export type PageType = "game" | "menu";

export type Services = {
  environment: Environment,
  addEvent: (e: EventToAdd) => void,
  text: TextConfig,
  resolution$: Stream<Resolution>,
  events$: EventStream,
  canvas: Canvas,
  socketID: number,
  mpServer: Inbox<EventToAdd>
}

export class PageFactory {
  private readonly services: Services

  constructor(services: Services) {
    this.services = services
  }

  private menuPage() {
    const { text, environment, resolution$, addEvent, mpServer } = this.services;
    return new MenuPage(text, environment, resolution$, addEvent, mpServer)
  }

  private gamePage() {
    const { text, addEvent, resolution$, socketID, events$, canvas } = this.services
    return new GamePage(text, addEvent, resolution$, socketID, events$, canvas)
  }

  get(page: PageType): Page {
    switch (page) {
      case "game":
        return this.gamePage()
      case "menu":
        return this.menuPage()
      default:
        throw new Error(`No page mapped to ${page}`)
    }
  }
}

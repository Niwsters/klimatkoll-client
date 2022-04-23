import { Services } from './services';
import { Event } from './event/event';
import { Card } from './game/card';
import { Stream, StreamSource } from './stream'
import { Page } from './pages/page'
import { MenuPage } from './pages/menu'
import { GamePage } from './pages/game'

type PageConstructor = (services: Services) => Page

const handlers: { [event_type: string]: PageConstructor } = {
  "room_joined": (services: Services) => new GamePage(services),
  "game_removed": (services: Services) => new MenuPage(services)
}

function handleEvent(event: Event): PageConstructor | undefined {
  return handlers[event.event_type]
}

export class Router {
  private readonly _page$: StreamSource<Page>;

  constructor(
    services: Services
  ) {
    const page = new MenuPage(services)

    services.events$.subscribe((event: Event) => {
      const nextPage = handleEvent(event)
      if (nextPage !== undefined)
        this._page$.next(nextPage(services))
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

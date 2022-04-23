import { Services } from './services';
import { Event } from './event/event';
import { Card } from './game/card';
import { Stream, StreamSource } from './stream'
import { Page } from './pages/page'
import { MenuPage } from './pages/menu'
import { GamePage } from './pages/game'

export class Router {
  private readonly _page$: StreamSource<Page>;

  constructor(
    services: Services
  ) {
    const page = new MenuPage(services)

    services.events$.subscribe((event: Event) => {
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

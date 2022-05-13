import { Event } from '../event/event';
import { ICard } from '@shared/models';
import { Stream, StreamSource } from '../stream'
import { Page, PageFactory, PageType } from '../pages'

const eventPageMapping: { [event_type: string]: PageType } = {
  "room_joined": "game",
  "game_removed": "menu"
} as const;

export class Router {
  private readonly _page$: StreamSource<Page>;
  private readonly pageFactory: PageFactory;

  constructor(pageFactory: PageFactory) {
    this.pageFactory = pageFactory
    this._page$ = new StreamSource(this.pageFactory.get("menu"))
  }

  private nextPage(type: PageType) {
    this._page$.next(this.pageFactory.get(type))
  }

  handleEvent(event: Event) {
    const nextPage = eventPageMapping[event.event_type]
    if (nextPage !== undefined) {
      this.nextPage(nextPage)
    }
  }

  get page$(): Stream<Page> {
    return this._page$
  }

  get cards(): ICard[] {
    return this._page$.value.cards
  }
}
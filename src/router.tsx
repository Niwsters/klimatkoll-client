import React from 'react'
import { EventToAdd } from './event/event';
import { TextConfig } from './models/text-config';
import { Stream, StreamSource } from './stream'
import { Menu } from './ui/components/Menu'

export class Router {
  private readonly _page$: StreamSource<React.ReactElement>;

  constructor(
    addEvent: (e: EventToAdd) => void,
    httpServerURL: string,
    text: TextConfig,
    width: number
  ) {
    this._page$ = new StreamSource(<div></div>)
    this._page$.next(
      <Menu
        text={text}
        httpServerURL={httpServerURL}
        width={width}
        addEvent={addEvent}>
      </Menu>
    )
  }

  get page$(): Stream<React.ReactElement> {
    return this._page$
  }
}

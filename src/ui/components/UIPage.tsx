import React from 'react'
import { GameState } from '../../game/gamestate'
import { EventToAdd } from '../../event/event'
import { Menu } from './Menu/Menu'
import { StatusBar } from './StatusBar'
import { TextConfig } from '../../models/text-config'

export function UIPage(
  currentPage: string,
  httpServerURL: string,
  text: TextConfig,
  addEvent: (e: EventToAdd) => void,
  gamestate: GameState,
  width: number
): React.ReactElement {
  switch(currentPage) {
    case "menu": {
      return <Menu
        httpServerURL={httpServerURL}
        text={text}
        addEvent={addEvent}
        width={width}
        />;
    }
    case "game":
      return <StatusBar
        gamestate={gamestate}
        text={text}
        addEvent={addEvent}
        appWidth={width}
        />;
    default:
      return <div></div>;
  }
}

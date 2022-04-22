import React from 'react'
import { BehaviorSubject } from "rxjs"
import { AppState } from '../app'
import { GameState } from '../game/gamestate'
import { EventToAdd } from '../event/event'
import { UIComponent } from './components/UI'
import ReactDOM from 'react-dom'
import { TextConfig } from '../models/text-config'
import { Resolution } from '../root'
import { Stream } from '../stream'
import { Environment } from '../root/environment'

export class UI {
  constructor(
    uiElem: HTMLElement,
    environment: Environment,
    text: TextConfig,
    state$: BehaviorSubject<AppState>,
    gamestate$: BehaviorSubject<GameState>,
    resolution$: Stream<Resolution>,
    addEvent: (e: EventToAdd) => void,
    router$: Stream<React.ReactElement>
  ) {
    ReactDOM.render(
      <UIComponent 
        environment={environment}
        text={text}
        state$={state$}
        gamestate$={gamestate$}
        resolution$={resolution$}
        addEvent={addEvent}
        router$={router$}
        />,
      uiElem
    )
  }
}

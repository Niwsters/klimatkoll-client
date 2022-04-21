import React from 'react'
import { BehaviorSubject } from "rxjs"
import { AppState } from '../app'
import { AppConfig } from '../root/app-config'
import { GameState } from '../game/gamestate'
import { EventToAdd } from '../event/event'
import { UIComponent } from './components/UI'
import ReactDOM from 'react-dom'
import { TextConfig } from '../models/text-config'

export class UI {
  readonly config: AppConfig
  readonly text: TextConfig
  readonly state$: BehaviorSubject<AppState>
  readonly gamestate$: BehaviorSubject<GameState>
  readonly appWidth$: BehaviorSubject<number>
  readonly addEvent: (e: EventToAdd) => void

  constructor(
    uiElem: HTMLElement,
    config: AppConfig,
    text: TextConfig,
    state$: BehaviorSubject<AppState>,
    gamestate$: BehaviorSubject<GameState>,
    appWidth$: BehaviorSubject<number>,
    addEvent: (e: EventToAdd) => void
  ) {
    this.config = config
    this.text = text
    this.state$ = state$
    this.gamestate$ = gamestate$
    this.appWidth$ = appWidth$
    this.addEvent = addEvent
    this.render(uiElem)
  }

  private render(uiElem: HTMLElement): void {
    ReactDOM.render(
      <UIComponent 
        config={this.config}
        text={this.text}
        state$={this.state$}
        gamestate$={this.gamestate$}
        appWidth$={this.appWidth$}
        addEvent={this.addEvent}
        />,
      uiElem
    )
  }
}

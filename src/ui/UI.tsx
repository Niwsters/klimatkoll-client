import React from 'react'
import { BehaviorSubject } from "rxjs"
import { AppState } from '../app'
import { AppConfig } from '../app-config'
import { GameState } from '../game/gamestate'
import { EventToAdd } from '../event/event'
import { UIComponent } from './components/UI'

export class UI {
  readonly config: AppConfig
  readonly state$: BehaviorSubject<AppState>
  readonly gamestate$: BehaviorSubject<GameState>
  readonly appWidth$: BehaviorSubject<number>
  readonly addEvent: (e: EventToAdd) => void

  constructor(
    config: AppConfig,
    state$: BehaviorSubject<AppState>,
    gamestate$: BehaviorSubject<GameState>,
    appWidth$: BehaviorSubject<number>,
    addEvent: (e: EventToAdd) => void
  ) {
    this.config = config
    this.state$ = state$
    this.gamestate$ = gamestate$
    this.appWidth$ = appWidth$
    this.addEvent = addEvent
  }

  render(): React.ReactElement {
    return <UIComponent 
      config={this.config}
      state$={this.state$}
      gamestate$={this.gamestate$}
      appWidth$={this.appWidth$}
      addEvent={this.addEvent}
      />;
  }
}

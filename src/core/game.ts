import { Event, EventToAdd } from 'event/event'
import { GameState } from './gamestate'
import { TextConfig } from '@shared/models'
import { Stream, StreamChannel, StreamSource } from '../stream'

export class Game {
  events$: StreamChannel<EventToAdd> = new StreamChannel()
  _state$: StreamSource<GameState>

  constructor(text: TextConfig, socketID: number) {
    this._state$ = new StreamSource(new GameState(text, socketID))
  }

  handleEvent(event: Event): void {
    let state = this._state$.value as any
    const func: any = state[event.event_type]
    if (typeof func == 'function') {
      let events: EventToAdd[]
      [state, events] = func.bind(state)(event)

      if (!state)
        throw new Error(`Event ${event} triggered a GameState function that returned ${state}`)

      this._state$.next(state)
      events.forEach((event: EventToAdd) => this.events$.next(event))
    }
  }

  update(currentTime: number) {
    this._state$.next(this._state$.value.update(currentTime))
  }

  get state$(): Stream<GameState> {
    return this._state$
  }

  get state(): GameState {
    return this._state$.value
  }
}
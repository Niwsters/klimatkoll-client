import { Subject, BehaviorSubject, Observable } from 'rxjs'
import { Event, EventToAdd } from '../event/event'
import { GameState } from './gamestate'
import { TextConfig } from '../models/text-config'

export class Game {
  events$: Subject<EventToAdd> = new Subject()
  _state$: BehaviorSubject<GameState>

  constructor(text: TextConfig, socketID: number) {
    this._state$ = new BehaviorSubject(new GameState(text, socketID))
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

  get state$(): Observable<GameState> {
    return this._state$
  }

  get state(): GameState {
    return this._state$.value
  }
}

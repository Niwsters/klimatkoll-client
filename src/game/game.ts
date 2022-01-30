import { Subject, BehaviorSubject } from 'rxjs'
import { Event, EventToAdd } from '../event/event'
import { GameState } from './gamestate'
import { AppConfig } from '../App'

export class Game {
  events$: Subject<EventToAdd> = new Subject()
  state$: BehaviorSubject<GameState>

  constructor(config: AppConfig) {
    this.state$ = new BehaviorSubject(new GameState(config))
  }

  handleEvent(event: Event): void {
    let state = this.state$.value as any
    const func: any = state[event.event_type]
    if (typeof func == 'function') {
      let events: EventToAdd[]
      [state, events] = func.bind(state)(event)

      if (!state)
        throw new Error(`Event ${event} triggered a GameState function that returned ${state}`)

      this.state$.next(state)
      events.forEach((event: EventToAdd) => this.events$.next(event))
    }
  }
}

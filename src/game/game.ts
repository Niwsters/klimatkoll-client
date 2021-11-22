import { Subject, BehaviorSubject } from 'rxjs'
import { Event, EventToAdd } from '../event/event'
import { GameState } from './gamestate'

export class Game {
  events$: Subject<EventToAdd> = new Subject()
  state$: BehaviorSubject<GameState> = new BehaviorSubject<GameState>(new GameState())

  handleEvent(event: Event): void {
    const state = this.state$.value as any
    const func: any = state[event.event_type]
    if (typeof func == 'function')
      this.state$.next(func(event))
  }
}

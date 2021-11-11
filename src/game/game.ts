import { Subject } from 'rxjs'
import { Event, EventToAdd } from '../event/event'

export class Game {
  events$: Subject<EventToAdd> = new Subject()

  handleEvent(event: Event): void {}
}

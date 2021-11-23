import { Subject } from 'rxjs'
import { Event, CreateGameEvent } from '../event/event'
import { TextConfig } from '../models/text-config'
import { AppConfig } from '../App'

export class Socket {
  events$: Subject<Event> = new Subject();
  websocket: WebSocket

  constructor(config: AppConfig) {
    console.log("Config: ", config)
    this.websocket = new WebSocket(config.wsServerURL, config.language)

    this.websocket.onmessage = (e: MessageEvent) => {
      const event: any = JSON.parse(e.data)
      event.event_type = event.type
      this.events$.next(event)
    }
  }

  handleEvent(event: Event): void {
    const func: ((e: Event) => Event[]) | undefined = (Socket as any)[event.event_type]
    if (func)
      func(event).forEach((e: Event) => this.websocket.send(JSON.stringify(e)));
  }

  static create_game(event: Event): Event[] {
    return [event]
  }

  static join_game(event: Event): Event[] {
    return [event]
  }
}

import { Subject } from 'rxjs'
import { Event } from '../event/event'

export class Socket {
  events$: Subject<Event> = new Subject();
  websocket: WebSocket

  constructor(websocketURL: string, language: string) {
    this.websocket = new WebSocket(websocketURL, language)

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

  static leave_game(event: Event): Event[] {
    return [event]
  }

  static play_card_request(event: Event): Event[] {
    return [event]
  }
}

import { Event } from '../event/event'
import { StreamChannel } from '../stream';

export class Socket {
  events$: StreamChannel<Event> = new StreamChannel();
  websocket: WebSocket
  socketID: number = -1

  constructor(websocketURL: string, language: string) {
    this.websocket = new WebSocket(websocketURL, language)

    this.websocket.onmessage = (e: MessageEvent) => {
      const event: any = JSON.parse(e.data)
      event.event_type = event.type
      this.events$.next(event)
    }
  }

  handleEvent(event: Event): void {
    if (event.event_type === "socket_id") {
      this.socketID = event.payload.socketID
    }

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

import { Event } from '../event/event'
import { StreamChannel } from '../stream';

export class Socket {
  events$: StreamChannel<Event> = new StreamChannel();
  websocket: WebSocket
  socketID: number = -1

  constructor(websocketURL: string, language: string) {
    this.websocket = new WebSocket(websocketURL, language)
    this.websocket.onmessage = (e: MessageEvent) => this.onMessage(e)
  }

  private onMessage(e: MessageEvent) {
    const event: any = JSON.parse(e.data)
    event.event_type = event.type
    this.events$.next(event)
  }

  async awaitSocketID() {
    return new Promise(resolve => {
      const sub = this.events$.subscribe(event => {
        if (event.event_type === "socket_id") {
          this.socketID = event.payload.socketID
          resolve(null)
          this.events$.unsubscribe(sub)
        }
      })
    })
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

export async function createSocket(webSocketURL: string, language: string): Promise<Socket> {
  const socket = new Socket(webSocketURL, language)
  await socket.awaitSocketID()
  return socket
}

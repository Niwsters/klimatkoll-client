import { Subject } from 'rxjs'
import { Event } from '../event/event'
import { TextConfig } from '../models/text-config'
import { AppConfig } from '../config'

export class GameSocket {
  events$: Subject<Event> = new Subject();

  constructor(config: AppConfig) {
    const socket = new WebSocket(config.wsServerURL, config.language)

    socket.onmessage = (e: MessageEvent) => {
      console.log(e)
    }
  }
}

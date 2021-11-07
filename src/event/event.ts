export class EventToAdd {
  event_type: string
  payload: any

  constructor(event_type: string, payload: any = {}) {
    this.event_type = event_type
    this.payload = payload
  }
}

export class Event extends EventToAdd {
  event_id: number

  constructor(event_id: number, event_type: string, payload: any = {}) {
    super(event_type, payload)
    this.event_id = event_id
  }
}

export class CreateGameEvent extends EventToAdd {
  constructor() {
    super("create_game")
  }
}

export class JoinGameEvent extends EventToAdd {
  constructor() {
    super("join_game")
  }
}

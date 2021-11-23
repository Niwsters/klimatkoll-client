export class EventToAdd {
  public event_type: string
  public payload: any

  constructor(event_type: string, payload: any = {}) {
    this.event_type = event_type
    this.payload = payload
  }
}

export class Event extends EventToAdd {
  public event_id: number

  constructor(event_id: number, event_type: string, payload: any = {}) {
    super(event_type, payload)
    this.event_id = event_id
  }
}

export class CreateGameEvent extends EventToAdd {
  constructor(roomID: string) {
    super("create_game", { roomID: roomID })
  }
}

export class JoinGameEvent extends EventToAdd {
  constructor(roomID: string) {
    super("join_game", { roomID: roomID })
  }
}

export class LeaveGameEvent extends EventToAdd {
  constructor() {
    super("leave_game")
  }
}

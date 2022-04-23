import { ICard } from '@shared/models'

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

export class CanvasResizedEvent extends EventToAdd {
  constructor(ratio: number) {
    super("canvas_resized", { ratio })
  }
}

export class CreateGameEvent extends EventToAdd {
  constructor(roomID: string) {
    super("create_game", { roomID })
  }
}

export class JoinGameEvent extends EventToAdd {
  constructor(roomID: string) {
    super("join_game", { roomID })
  }
}

export class LeaveGameEvent extends EventToAdd {
  constructor() {
    super("leave_game")
  }
}

export class MouseClickedEvent extends EventToAdd {
  constructor() {
    super("mouse_clicked")
  }
}

export class MouseMovedEvent extends EventToAdd {
  constructor(mouseX: number, mouseY: number) {
    super("mouse_moved", { mouseX, mouseY })
  }
}

export class PlayCardRequestEvent extends EventToAdd {
  constructor(cardID: number, position: number) {
    super("play_card_request", { cardID, position })
  }
}

export class CardHoveredEvent extends EventToAdd {
  constructor(cardID: number) {
    super("card_hovered", { cardID })
  }
}

export class CardUnhoveredEvent extends EventToAdd {
  constructor(cardID: number) {
    super("card_unhovered", { cardID })
  }
}

export class EmissionsLineCardAddedEvent extends EventToAdd {
  constructor(card: ICard, position: number) {
    super("emissions_line_card_added", { card, position })
  }
}

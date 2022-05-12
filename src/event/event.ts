export type EventToAdd = {
  event_type: string
  payload: any
}

export type Event = EventToAdd & {
  event_id: number
}


function eventToAdd(event_type: string, payload: any): EventToAdd {
  return { event_type, payload } as const
}

export function createEvent(event_id: number, event_type: string, payload: any): Event {
  return { ...eventToAdd(event_type, payload), event_id } as const
}

export function createGameEvent(roomID: string): EventToAdd {
  return eventToAdd("create_game", { roomID })
}

export function joinGameEvent(roomID: string): EventToAdd {
  return eventToAdd("join_game", { roomID })
}

export function leaveGameEvent(): EventToAdd {
  return eventToAdd("leave_game", {})
}

export function mouseClickedEvent(): EventToAdd {
  return eventToAdd("mouse_clicked", {})
}

export function mouseMovedEvent(mouseX: number, mouseY: number): EventToAdd {
  return eventToAdd("mouse_moved", { mouseX, mouseY })
}

export function playCardRequestEvent(cardID: number, position: number): EventToAdd {
  return eventToAdd("play_card_request", { cardID, position })
}

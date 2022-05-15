import { Position } from "core/position";
import { Event } from '@shared/events'
import { handleEvent } from "event/event-handler";

function mouse_moved(_: Position, event: Event): Position {
  return new Position(event.payload.mouseX, event.payload.mouseY)
}

function handleMouseEvent(mousePosition: Position, event: Event): Position {
  return handleEvent<Position>(mousePosition, event, { mouse_moved })
}

export function getMousePosition(events: Event[]): Position {
  return events.reduce(handleMouseEvent, new Position(0, 0))
}


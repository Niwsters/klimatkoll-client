import { Hand } from "core/hand"
import { Event } from "@shared/events"
import { Position } from "core/position"
import { handleEvent } from "event/event-handler"

function draw_card(hand: Hand, event: Event): Hand {
  return hand.addCard(event.payload.card).update(event.timestamp, 0, 0)
}

function mouse_moved(hand: Hand, event: Event): Hand {
  return hand.update(event.timestamp, event.payload.mouseX, event.payload.mouseY)
}

function mouse_clicked(hand: Hand, event: Event): Hand {
  return hand.mouseClicked(event.payload.mouseX, event.payload.mouseY)
}

function handleHandEvent(hand: Hand, event: any): Hand {
  return handleEvent<Hand>(hand, event, { draw_card, mouse_clicked, mouse_moved })
}

export function getHand(events: any[], currentTime: number, mousePosition: Position): Hand {
  return events
    .reduce(handleHandEvent, new Hand())
    .update(currentTime, mousePosition.x, mousePosition.y)
}

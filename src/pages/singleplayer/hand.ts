import { Hand } from "core/hand"
import { Event } from "@shared/events"

function draw_card(hand: Hand, event: any) {
  return hand.addCard(event.payload.card).update(event.timestamp, 0, 0)
}

function mouse_moved(hand: Hand, event: Event): Hand {
  return hand.update(event.timestamp, event.payload.mouseX, event.payload.mouseY)
}

type HandEventHandler = (hand: Hand, event: any) => Hand

function getHandler(event: Event): HandEventHandler {
  switch (event.event_type) {
    case "draw_card":
      return draw_card
    case "mouse_moved":
      return mouse_moved
    default:
      return (hand: Hand, _) => hand
  }
}

function handleEvent(hand: Hand, event: any): Hand {
  return getHandler(event)(hand, event)
}

export function getHand(events: any[], currentTime: number): Hand {
  return events.reduce(handleEvent, new Hand()).animate(currentTime)
}

import { EventToAdd } from "@shared/events"
import { SP_SOCKET_ID } from "core/constants"
import { drawCard } from "./events"
import { SPState } from "./sp-state"

function playCardFromHand(cardID: number, position: number): EventToAdd {
  return {
    event_type: "card_played_from_hand",
    payload: { cardID: cardID, socketID: SP_SOCKET_ID, position: position },
    timestamp: Date.now()
  }
}

export function playCardRequest(state: SPState, event: EventToAdd): EventToAdd[] {
  return [
    playCardFromHand(event.payload.cardID, event.payload.position),
    drawCard(state.deck, SP_SOCKET_ID)
  ]
}

import { EventToAdd } from "@shared/events"
import { SP_SOCKET_ID } from "core/constants"
import { drawCard, playCardFromHand } from "./events"
import { SPState } from "./sp-state"

export function playCardRequest(state: SPState, event: EventToAdd): EventToAdd[] {
  return [
    playCardFromHand(event.payload.cardID, event.payload.position),
    drawCard(state.deck, SP_SOCKET_ID)
  ]
}

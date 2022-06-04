import { EventToAdd } from "@shared/events"
import { Card } from "core/card"
import { SP_SOCKET_ID } from "core/constants"
import { drawCard, playCardFromHand } from "./events"
import { SPState } from "./sp-state"
import { spacedEmissionsLine } from "./spaced-emissions-line"

function incorrectCardPlacement(cardID: number): EventToAdd {
  return {
    event_type: "incorrect_card_placement",
    payload: { cardID },
    timestamp: Date.now()
  }
}

type NoCard = undefined | null

function isCorrectCardPlacement(
  cardBefore: Card | NoCard,
  card: Card,
  cardAfter: Card | NoCard
): boolean {
  if (cardBefore && cardBefore.emissions > card.emissions)
    return false

  if (cardAfter && cardAfter.emissions < card.emissions)
    return false

  return true
}

export function playCardRequest(state: SPState, event: EventToAdd): EventToAdd[] {
  const position = event.payload.position
  const cardID = event.payload.cardID
  const card = state.hand.find(c => c.id === cardID)

  if (!card) return []

  const el = spacedEmissionsLine(state.emissionsLine)
  const cardBefore = el[position-1]
  const cardAfter = el[position+1]

  if (isCorrectCardPlacement(cardBefore, card, cardAfter)) {
    return [
      playCardFromHand(event.payload.cardID, event.payload.position),
      drawCard(state.deck, SP_SOCKET_ID)
    ]
  }

  return [
    incorrectCardPlacement(card.id),
    drawCard(state.deck, SP_SOCKET_ID)
  ]
}

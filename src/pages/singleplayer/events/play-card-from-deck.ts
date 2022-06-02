import { EventToAdd } from "@shared/events"
import { Card } from "core/card"

export function playCardFromDeck(cards: Card[]): EventToAdd {
  const cardID = Math.floor(Math.random() * cards.length)
  return {
    event_type: "card_played_from_deck",
    payload: { card: cards[cardID] },
    timestamp: Date.now()
  }
}

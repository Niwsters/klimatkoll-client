import { EventToAdd } from "@shared/events"
import { SPState } from "./sp-state"

function cardDrawn(state: SPState, event: EventToAdd): SPState {
  return {
    ...state,
    deck: state.deck.filter(c => c.id !== event.payload.card.id)
  }
}

function cardPlayedFromDeck(state: SPState, event: EventToAdd): SPState {
  return {
    ...state,
    deck: state.deck.filter(c => c.id !== event.payload.card.id)
  }
}

export function getState(state: SPState, event: EventToAdd): SPState {
  switch (event.event_type) {
    case "draw_card":
      return cardDrawn(state, event)
    case "card_played_from_deck":
      return cardPlayedFromDeck(state, event)
    default:
      return state
  }
}

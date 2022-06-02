import { EventToAdd } from "@shared/events"
import { Card } from "core/card"
import { SPState } from "./sp-state"
import { insertCardIntoEmissionsLine } from './spaced-emissions-line'

function drawCard(state: SPState, event: EventToAdd): SPState {
  return {
    ...state,
    deck: state.deck.filter(c => c.id !== event.payload.card.id),
    hand: [...state.hand, event.payload.card]
  }
}

function removeCardFromDeck(state: SPState, card: Card): SPState {
  return {
    ...state,
    deck: state.deck.filter(c => c.id !== card.id)
  }
}

function playCardToEmissionsLine(state: SPState, card: Card, position: number): SPState {
  return {
    ...state,
    emissionsLine: insertCardIntoEmissionsLine(state.emissionsLine, card, position)
  }
}

function cardPlayedFromDeck(state: SPState, event: EventToAdd): SPState {
  return {
    ...state,
    ...removeCardFromDeck(state, event.payload.card),
    ...playCardToEmissionsLine(state, event.payload.card, 0)
  }
}

function cardPlayedFromHand(state: SPState, event: EventToAdd): SPState {
  const card = state.hand.find(c => c.id === event.payload.cardID)

  if (!card) return {...state}

  return {
    ...state,
    ...playCardToEmissionsLine(state, card, event.payload.position)
  }
}

export function getState(state: SPState, event: EventToAdd): SPState {
  switch (event.event_type) {
    case "draw_card":
      return drawCard(state, event)
    case "card_played_from_deck":
      return cardPlayedFromDeck(state, event)
    case "card_played_from_hand":
      return cardPlayedFromHand(state, event)
    default:
      return state
  }
}

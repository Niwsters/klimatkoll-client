import { Card, SpaceCard } from './card'
import { Hand, OpponentHand } from './hand'
import { EmissionsLine } from './emissions-line'
import {
  WIDTH,
  HEIGHT,
  DECK_POSITION,
  ANIMATION_DURATION_MS
} from './constants'

export interface ClientEvent {
  event_id: number
  event_type: string
  payload: any
  timestamp: number
}

export class GameState {
  // Every Card has a parameter for whatever container it is in, instead of
  // containers being actual arrays
  cards: Card[] = []//[new SpaceCard()]
  isMyTurn: boolean = false
  socketID: number = -1
  hoveredCardIDs = new Set<number>()
  selectedCardID?: number

  static addClientEvent(
    event_type: string,
    payload: any = {},
    clientEvents: ClientEvent[],
    currentTime: number
  ): ClientEvent[] {
    const lastClientEvent = clientEvents[clientEvents.length - 1]
    const lastClientEventID = lastClientEvent ? lastClientEvent.event_id : 0

    return [...clientEvents, {
      event_id: lastClientEventID + 1,
      event_type: event_type,
      payload: payload,
      timestamp: currentTime
    }]
  }

  static getFocusedCardID(state: GameState): number | undefined {
    return Array.from(state.hoveredCardIDs)[0]
  }

  static fromEvents(events: ClientEvent[], currentTime: number = Date.now()): GameState {
    return events.reduce((state: GameState, event: ClientEvent) => {
      switch(event.event_type) {
        case "waiting_for_players":
          // No payload
          break
        case "playing":
          // No payload
          state.cards.push(new SpaceCard(state))
          break
        case "draw_card": {
          // { socketID, card }
          // Draw card into correct hand
          const server_card = event.payload.card
          const timePassed = currentTime - event.timestamp

          if (event.payload.socketID == state.socketID) {
            state.cards.push(new Card(server_card.id, server_card.name, "hand"))
            state = Hand.rearrange(state, timePassed)
          } else {
            state.cards.push(new Card(server_card.id, server_card.name, "opponent-hand"))
            state = OpponentHand.rearrange(state)
          }

          break
        }
        case "return_opponent_hand":
          // No payload
          break
        case "card_played_from_deck": {
          // { card, position }
          const serverCard = event.payload.card
          const timePassed = currentTime - event.timestamp
          state = EmissionsLine.add(state, new Card(serverCard.id, serverCard.name, "emissions-line"))
          state = EmissionsLine.rearrange(state, timePassed)
          break
        }
        case "card_played_from_hand":
          // { socketID, cardID, position }
          break
        case "incorrect_card_placement":
          // { cardID, socketID }
          break
        case "player_turn":
          // { socketID }
          break
        case "game_won":
          // { socketID }
          break
        case "vote_new_game":
          // { socketID }
          break
        case "next_card":
          // { card }
          break
        case "card_hovered": {
          const card_id = event.payload.card_id
          const timePassed = currentTime - event.timestamp
          state.hoveredCardIDs.add(card_id)
          state = Hand.rearrange(state, timePassed)
          state = EmissionsLine.rearrange(state, timePassed)
          break
        }
        case "card_unhovered": {
          const card_id = event.payload.card_id
          const timePassed = currentTime - event.timestamp
          state.hoveredCardIDs.delete(card_id)
          state = Hand.rearrange(state, timePassed)
          state = EmissionsLine.rearrange(state, timePassed)
          break
        }
        case "mouse_clicked": {
          const focusedCardID = GameState.getFocusedCardID(state)
          if (focusedCardID) {
            const card = state.cards.find(c => c.id === focusedCardID)

            if (card && card.container == "hand") {
              state.selectedCardID = focusedCardID
            }
          }
          break
        }
        case "socket_id": {
          state.socketID = event.payload.socketID
          break
        }
      }

      return state
    }, new GameState())
  }
}

import { Card } from './card'
import { Hand, OpponentHand } from './hand'
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

interface TransposeGoal {
  position?: number[]
  rotation?: number
  addedRotation?: number
  scale?: number
}

function transpose(from: number, to: number, timePassed: number) {
  if (timePassed > ANIMATION_DURATION_MS) return to

  const fraction = timePassed/ANIMATION_DURATION_MS
  const mult = 1 - (1 - fraction) ** 2 // easeOutQuad easing function
  return from + (to - from)*mult
}

export function transposeCard(
  card: Card,
  goal: TransposeGoal,
  timePassed: number
): Card {
  const newCard = { ...card }

  if (goal.position != undefined) {
    newCard.position = [
      transpose(card.position[0], goal.position[0], timePassed),
      transpose(card.position[1], goal.position[1], timePassed)
    ]
  }

  if (goal.rotation != undefined) {
    newCard.rotation = transpose(card.rotation, goal.rotation, timePassed)
  }

  if (goal.addedRotation != undefined) {
    newCard.addedRotation = transpose(card.addedRotation, goal.addedRotation, timePassed)
  }
  
  if (goal.scale != undefined) {
    newCard.scale = transpose(card.scale, goal.scale, timePassed)
  }

  return newCard
}

export class GameState {
  // Every Card has a parameter for whatever container it is in, instead of
  // containers being actual arrays
  cards: Card[] = []
  isMyTurn: boolean = false
  socketID: number = -1

  static fromEvents(events: ClientEvent[], currentTime: number = Date.now()): GameState {
    return events.reduce((state: GameState, event: ClientEvent) => {
      switch(event.event_type) {
        case "waiting_for_players":
          // No payload
          break
        case "playing":
          // No payload
          break
        case "draw_card":
          // { socketID, card }
          // Draw card into correct hand
          const server_card = event.payload.card
          const timePassed = currentTime - event.timestamp

          if (event.payload.socketID == state.socketID) {
            state.cards.push(new Card(server_card.id, server_card.name, "hand"))
          } else {
            state.cards.push(new Card(server_card.id, server_card.name, "opponent-hand"))
          }

          // Rearrange cards
          state = Hand.rearrange(state)
          state = OpponentHand.rearrange(state)

          break
        case "return_opponent_hand":
          // No payload
          break
        case "card_played_from_deck":
          // { card, position }
          break
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

          state = Hand.rearrange(state, card_id)
          break
        }
        case "card_unhovered": {
          const card_id = event.payload.card_id
          const timePassed = currentTime - event.timestamp

          state = Hand.rearrange(state)
          break
        }
        case "mouse_clicked": {
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

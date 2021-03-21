import { Card } from './card'

export interface ServerEvent {
  event_id: number
  event_type: string
  payload: any
  timestamp: number
}

const WIDTH = 960
const HEIGHT = 540
const HAND_POSITION = [WIDTH / 2, HEIGHT-20]
const DECK_POSITION = [702, HEIGHT/2]
const ANIMATION_DURATION_MS = 300

interface TransposeGoal {
  position?: number[]
  rotation?: number
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

  if (goal.position) {
    newCard.position = [
      transpose(card.position[0], goal.position[0], timePassed),
      transpose(card.position[1], goal.position[1], timePassed)
    ]
  }

  if (goal.rotation) {
    newCard.rotation = transpose(card.rotation, goal.rotation, timePassed)
  }
  
  if (goal.scale) {
    newCard.scale = transpose(card.scale, goal.scale, timePassed)
  }

  return newCard
}

export class GameState {
  // Every Card has a parameter for whatever container it is in, instead of
  // containers being actual arrays
  cards: Card[] = []
  isMyTurn: boolean = false

  static fromEvents(events: ServerEvent[], currentTime: number = Date.now()): GameState {
    return events.reduce((state: GameState, event: ServerEvent) => {
      switch(event.event_type) {
        case "waiting_for_players":
          // No payload
          break
        case "playing":
          // No payload
          break
        case "draw_card":
          // { socketID, card }
          const server_card = event.payload.card
          let card = new Card(server_card.id, server_card.name, "hand")
          card.position = DECK_POSITION
          const timePassed = currentTime - event.timestamp
          card = transposeCard(card, { position: HAND_POSITION }, timePassed)
          state.cards.push(card)
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
        case "mouse_moved": {
          /*
          const x = event.payload.x
          const y = event.payload.y
          state.cards = state.cards.map((card: Card) => {
            return {
              ...card,
              position: [x, y]
            }
          })
          */
          break
        }
        case "mouse_clicked": {
          const x = event.payload.x
          const y = event.payload.y
          const timePassed = currentTime - event.timestamp
          state.cards = state.cards.map((card: Card) => {
            return transposeCard(card, { position: [x, y] }, timePassed)
          })
          break
        }
      }

      return state
    }, new GameState())
  }
}

import { Card } from './card'

export interface ClientEvent {
  event_id: number
  event_type: string
  payload: any
  timestamp: number
}

const WIDTH = 960
const HEIGHT = 540
const HAND_POSITION = [WIDTH / 2, HEIGHT+50]
const DECK_POSITION = [702, HEIGHT/2]
const ANIMATION_DURATION_MS = 200
const HAND_CARD_ANGLE = Math.PI/5
const HAND_X_RADIUS = 200
const HAND_Y_RADIUS = 100
const HAND_ANGLE_FACTOR = HAND_Y_RADIUS / HAND_X_RADIUS // The angle should not map to the same ellipse as the position

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
          const server_card = event.payload.card
          let card = new Card(server_card.id, server_card.name, "hand")
          card.position = DECK_POSITION
          const timePassed = currentTime - event.timestamp
          card = transposeCard(card, { position: HAND_POSITION }, timePassed)
          state.cards.push(card)

          // Move all hand cards to their respective positions
          // forEach instead of map for optimisation reasons
          const handCards = state.cards.filter((c: Card) => c.container === "hand")
          handCards.forEach((card: Card, i: number) => {
            const n = handCards.length - 1
            const angle = HAND_CARD_ANGLE * (i - n/2)
            const x = HAND_POSITION[0] + HAND_X_RADIUS * Math.sin(angle)
            const y = HAND_POSITION[1] - HAND_Y_RADIUS * Math.cos(angle)
            card.position = [x,y]
            card.rotation = angle * HAND_ANGLE_FACTOR
          })

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

          state.cards = state.cards
            .map(c => {
              if (c.id === card_id) {
                return transposeCard(c, { scale: Card.DEFAULT_SCALE * 2 }, timePassed)
              }

              return c
            })

          break
        }
        case "card_unhovered": {
          const card_id = event.payload.card_id
          const timePassed = currentTime - event.timestamp

          state.cards = state.cards
            .map(c => {
              if (c.id === card_id) {
                return transposeCard(c, { scale: Card.DEFAULT_SCALE }, timePassed)
              }

              return c
            })
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

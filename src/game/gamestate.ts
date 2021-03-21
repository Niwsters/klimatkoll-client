import { Card } from './card'

export interface ServerEvent {
  event_id: number
  event_type: string
  payload: any
}

const WIDTH = 960
const HEIGHT = 540
const HAND_POSITION = [WIDTH / 2, HEIGHT-20]

export class GameState {
  // Every Card has a parameter for whatever container it is in, instead of
  // containers being actual arrays
  cards: Card[] = []
  /*
  hand: Card[] = []
  opponentHand: Card[] = []
  emissionLine: Card[] = []
  deck: Card[] = []
  discardPile: Card[] = []
  */
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
          const card = new Card(server_card.id, server_card.name, "hand")
          card.position = HAND_POSITION
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
          const timePassed = currentTime - event.payload.timestamp
          const animationTimeMillis = 300
          state.cards = state.cards.map((card: Card) => {
            const start_x = card.position[0]
            const start_y = card.position[1]
            let new_pos = [x,y]
            if (timePassed < animationTimeMillis) {
              const fraction = timePassed/animationTimeMillis
              const mult = 1 - (1 - fraction) ** 2
              new_pos = [
                start_x + (x - start_x)*mult,
                start_y + (y - start_y)*mult
              ]
            }

            return {
              ...card,
              position: new_pos
            }
          })
          break
        }
      }

      return state
    }, new GameState())
  }
}

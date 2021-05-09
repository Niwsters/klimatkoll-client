import { Observable, BehaviorSubject } from 'rxjs'
import { merge } from 'rxjs/operators'
import { Card, SpaceCard, TransposeGoal } from './card'
import { Hand, OpponentHand } from './hand'
import { EmissionsLine } from './emissions-line'
import { Event } from './event'
import {
  WIDTH,
  HEIGHT,
  DECK_POSITION,
  ANIMATION_DURATION_MS,
  DISCARD_PILE_POSITION
} from './constants'

export interface ServerCommand {
  context: string
  type: string
  payload: any
}

export class GameState {
  // Every Card has a parameter for whatever container it is in, instead of
  // containers being actual arrays
  cards: Card[] = []
  emissionsLineCardOrder: number[] = []
  isMyTurn: boolean = false
  socketID: number = -1
  hoveredCardIDs = new Set<number>()
  selectedCardID?: number

  static getFocusedCardID(state: GameState): number | undefined {
    return Array.from(state.hoveredCardIDs)[0]
  }

  static getFocusedCard(state: GameState): Card | undefined {
    const id = GameState.getFocusedCardID(state)
    return state.cards.find(c => c.id == id)
  }


  static getSelectedCard(state: GameState): Card | undefined {
    return state.cards.find(c => c.id == state.selectedCardID)
  }

  static incorrectCardPlacement(state: GameState, event: Event, timePassed: number): GameState {
    state =  { ...state }

    const card = state.cards.find(c => c.id === event.payload.cardID)

    const goal: TransposeGoal = {
      position: DISCARD_PILE_POSITION
    }

    state.cards = state.cards.map(card => {
      if (card.id !== event.payload.cardID) return card

      return Card.transpose({
        ...card,
        container: "discard-pile"
      }, goal, timePassed)
    })

    return state
  }

  static updateCards(state: GameState, updated: Card[]): GameState {
    state.cards = state.cards.map(card => {
      const updatedCard = updated.find(c => c.id === card.id)

      return updatedCard ? updatedCard : card
    })

    return state
  }

  static fromEvents(events: Event[], currentTime: number = Date.now()): GameState {
    return events.reduce((state: GameState, event: Event) => {
      const timePassed = currentTime - event.timestamp
      switch(event.event_type) {
        case "waiting_for_players":
          // No payload
          break
        case "playing":
          // No payload
          const sc = new SpaceCard(state)
          state.cards.push(sc)
          state.emissionsLineCardOrder.push(sc.id)
          break
        case "draw_card": {
          // { socketID, card }
          // Draw card into correct hand
          const server_card = event.payload.card

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
          state = EmissionsLine.add(
            state,
            new Card(serverCard.id, serverCard.name, "emissions-line"),
            1)
          state = EmissionsLine.rearrange(state, timePassed)
          break
        }
        case "card_played_from_hand":
          // { socketID, cardID, position }
          // Move card to emissions line
          const playedCard = state.cards.find(c => c.id == event.payload.cardID)
          const position = event.payload.position+1
          if (!playedCard) {
            throw new Error("Played card does not exist with ID: " + event.payload.cardID)
          }
          state.selectedCardID = undefined
          const movedCard = new Card(playedCard.id, playedCard.name, "emissions-line")
          movedCard.position = playedCard.position
          state.cards = state.cards.filter(c => c !== playedCard)
          state = EmissionsLine.add(state, movedCard, position)
          state = EmissionsLine.rearrange(state, timePassed)
          state = Hand.rearrange(state, timePassed)

          /*
          const spaceCard = new SpaceCard(state)
          let i = 0;
          state.cards = state.cards.reduce((cards: Card[], card: Card) => {
            if (c.container != "emissions-line") return [...cards, c];

            if (i === position) {
              i += 1
              return [...cards, c, movedCard, spaceCard]
            }

            i += 1
            return [...cards, c];
          }, [])
          */

          break
        case "incorrect_card_placement": {
          // { cardID, socketID }
          state = GameState.incorrectCardPlacement(state, event, timePassed)
          break
        }
        case "player_turn":
          // { socketID }
          if (state.socketID === event.payload.socketID) {
            state.isMyTurn = true
          } else {
            state.isMyTurn = false
          }
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
          state.hoveredCardIDs.add(card_id)
          state = Hand.rearrange(state, timePassed)
          state = EmissionsLine.rearrange(state, timePassed)
          break
        }
        case "card_unhovered": {
          const card_id = event.payload.card_id
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

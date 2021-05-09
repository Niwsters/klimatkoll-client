import { Observable, BehaviorSubject } from 'rxjs'
import { merge } from 'rxjs/operators'
import { Card, SpaceCard } from './card'
import { Hand, OpponentHand } from './hand'
import { EmissionsLine } from './emissions-line'
import { Event } from './event'
import {
  WIDTH,
  HEIGHT,
  DECK_POSITION,
  ANIMATION_DURATION_MS
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

  /*
  static addEvent(
    clientEvents: Event[],
    currentTime: number,
    event_type: string,
    payload: any = {}
  ): Event[] {
    const lastEvent = clientEvents[clientEvents.length - 1]
    const lastEventID = lastEvent ? lastEvent.event_id : 0

    return [...clientEvents, {
      event_id: lastEventID + 1,
      event_type: event_type,
      payload: payload,
      timestamp: currentTime
    }]
  }

  static newCommand(
    state: GameState,
    clientEvents: Event[],
    currentTime: number,
    event_type: string,
    payload: any = {}
  ): void {//Command {
    /*
    clientEvents = [...clientEvents]
    let serverCommand: ServerCommand | undefined

    const addCE = (): Event[] => GameState.addEvent(
        clientEvents,
        currentTime,
        event_type,
        payload)

    switch(event_type) {
      case "mouse_clicked": {
        clientEvents = addCE()

        const focusedCard = GameState.getFocusedCard(state)
        if (state.isMyTurn && state.selectedCardID && focusedCard && focusedCard.isSpace) {
          const position = state.emissionsLineCardOrder.findIndex(cardID => focusedCard.id === cardID)
          serverCommand = {
            context: "game",
            type: "card_played_from_hand",
            payload: {
              cardID: state.selectedCardID,
              position: position
            }
          }
        }
      }
    }

    return {
      clientEvents: clientEvents,
      serverCommand: serverCommand
    }
  }
  */

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
        case "incorrect_card_placement":
          // { cardID, socketID }
          break
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

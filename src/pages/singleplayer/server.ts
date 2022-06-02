import { EventToAdd } from "@shared/events";
import { Card } from "core/card";
import { SP_SOCKET_ID } from "core/constants";
import { fetchCardData } from "shared/fetch-card-data";
import { StreamChannel } from "../../stream";
import { playCardFromDeck } from "./events";
import { drawCard } from './events/draw-card'

async function getCards(baseUrl: string): Promise<Card[]> {
  const cardData = await fetchCardData(baseUrl)

  return cardData.map((c, i) => new Card(i, c.name))
}

function cardDrawn(state: SPState, event: EventToAdd): SPState {
  return {
    ...state,
    deck: state.deck.filter(c => c.id !== event.payload.card.id)
  }
}

type NoEvent = undefined;
const NO_EVENT: NoEvent = undefined

function playCardFromHand(cardID: number, position: number): EventToAdd {
  return {
    event_type: "card_played_from_hand",
    payload: { cardID: cardID, socketID: SP_SOCKET_ID, position: position },
    timestamp: Date.now()
  }
}

function playCardRequest(state: SPState, event: EventToAdd): EventToAdd[] {
  return [
    playCardFromHand(event.payload.cardID, event.payload.position),
    drawCard(state.deck, SP_SOCKET_ID)
  ]
}

function getCommands(state: SPState, event: EventToAdd): EventToAdd[] | NoEvent {
  switch (event.event_type) {
    case "play_card_request":
      return playCardRequest(state, event)
    default:
      return NO_EVENT
  }
}

function cardPlayedFromDeck(state: SPState, event: EventToAdd): SPState {
  return {
    ...state,
    deck: state.deck.filter(c => c.id !== event.payload.card.id)
  }
}

function getState(state: SPState, event: EventToAdd): SPState {
  switch (event.event_type) {
    case "draw_card":
      return cardDrawn(state, event)
    case "card_played_from_deck":
      return cardPlayedFromDeck(state, event)
    default:
      return state
  }
}

type SPState = {
  deck: Card[]
}

export class SPServer {
  readonly events$: StreamChannel<EventToAdd> = new StreamChannel()

  private state: SPState = {
    deck: []
  }

  private setDeck(deck: Card[]) {
    this.state = {
      ...this.state,
      deck
    }
  }

  async fetchDeck(baseUrl: string) {
    this.setDeck(await getCards(baseUrl))
    this.events$.next(drawCard(this.deck, SP_SOCKET_ID))
    this.events$.next(playCardFromDeck(this.deck))
  }

  get deck(): Card[] {
    return this.state.deck
  }

  handleEvent(event: EventToAdd) {
    console.log(event.event_type)

    this.state = getState(this.state, event)

    const result = getCommands(this.state, event)
    if (result !== NO_EVENT) {
      result.forEach(event => this.events$.next(event))
    }

    console.log(this.state)
  }
}

import { EventToAdd } from "@shared/events";
import { Card } from "core/card";
import { fetchCardData } from "shared/fetch-card-data";
import { StreamChannel } from "../../stream";

const SP_SOCKET_ID = 1;

async function getCards(baseUrl: string): Promise<Card[]> {
  const cardData = await fetchCardData(baseUrl)

  return cardData.map((c, i) => new Card(i, c.name))
}

function drawCard(cards: Card[], socketID: number): EventToAdd {
  const cardID = Math.floor(Math.random() * cards.length)

  return {
    event_type: "draw_card",
    payload: { card: cards[cardID], socketID },
    timestamp: Date.now()
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

function playCardRequest(deck: Card[], event: EventToAdd): EventToAdd[] {
  return [
    playCardFromHand(event.payload.cardID, event.payload.position),
    drawCard(deck, SP_SOCKET_ID)
  ]
}

function handleGameEvent(deck: Card[], event: EventToAdd): EventToAdd[] | NoEvent {
  switch (event.event_type) {
    case "play_card_request":
      return playCardRequest(deck, event)
    default:
      return NO_EVENT
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
  }

  get deck(): Card[] {
    return this.state.deck
  }

  handleEvent(event: EventToAdd) {
    const result = handleGameEvent(this.deck, event)
    if (result !== NO_EVENT) {
      result.forEach(event => this.events$.next(event))
    }
  }
}

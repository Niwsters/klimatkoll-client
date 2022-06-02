import { EventToAdd } from "@shared/events";
import { Card } from "core/card";
import { SP_SOCKET_ID } from "core/constants";
import { fetchCardData } from "shared/fetch-card-data";
import { StreamChannel } from "../../stream";
import { playCardFromDeck } from "./events";
import { drawCard } from './events/draw-card'
import { SPState } from './sp-state'
import { getCommands, NO_EVENT } from './get-commands'
import { getState } from './get-state'

async function getCards(baseUrl: string): Promise<Card[]> {
  const cardData = await fetchCardData(baseUrl)

  return cardData.map((c, i) => new Card(i, c.name))
}

export class SPServer {
  readonly events$: StreamChannel<EventToAdd> = new StreamChannel()

  private state: SPState = {
    deck: [],
    emissionsLine: []
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
    this.state = getState(this.state, event)

    const result = getCommands(this.state, event)
    if (result !== NO_EVENT) {
      result.forEach(event => this.events$.next(event))
    }

    console.log(event.event_type)
    console.log(this.state)
  }
}

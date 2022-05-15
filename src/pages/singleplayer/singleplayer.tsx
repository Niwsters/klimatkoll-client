import { Event } from "@shared/events";
import { Card } from "core/card";
import { Hand } from "core/hand";
import { Page } from "pages/page";
import { Services } from "pages/page-factory";
import React from "react";
import { fetchCardData } from "shared/fetch-card-data";
import { getHand } from './hand'

async function getCards(baseUrl: string): Promise<Card[]> {
  const cardData = await fetchCardData(baseUrl)

  return cardData.map((c, i) => new Card(i, c.name))
}

function drawCard(cards: Card[]): any {
  return {
    event_type: "draw_card",
    payload: { card: cards[0] },
    timestamp: Date.now()
  }
}

export class SinglePlayerPage implements Page {
  component: React.ReactElement = <h1>oh hi</h1>;
  private events: any[] = []

  private async getCards(baseUrl: string) {
    const allCards = await getCards(baseUrl)
    this.events = [...this.events, drawCard(allCards)]
  }

  private addEvent(event: Event) {
    this.events.push(event)
  }

  get cards(): Card[] {
    return [...this.hand.cards]
  }

  get hand(): Hand {
    return getHand(this.events, Date.now())
  }

  constructor(services: Services) {
    services.events$.subscribe(event => this.addEvent(event))
    this.getCards(`${services.environment.httpServerURL}/${services.environment.language}`)
  }
}

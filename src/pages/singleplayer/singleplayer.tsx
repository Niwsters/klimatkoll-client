import { ICard } from "@shared/models";
import { Card } from "core/card";
import { Deck } from "core/deck";
import { Page } from "pages/page";
import { Services } from "pages/page-factory";
import React from "react";
import { fetchCardData } from "shared/fetch-card-data";

async function getCards(baseUrl: string): Promise<ICard[]> {
  const cardData = await fetchCardData(baseUrl)

  return cardData.map((c, i) => new Card(i, c.name))
}

export class SinglePlayerPage implements Page {
  component: React.ReactElement = <h1>oh hi</h1>;
  cards: ICard[] = [];

  private async getCards(baseUrl: string) {
    this.cards = await getCards(baseUrl)
  }

  constructor(services: Services) {
    this.getCards(`${services.environment.httpServerURL}/${services.environment.language}`)
  }
}

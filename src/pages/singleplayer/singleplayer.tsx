import { ICard } from "@shared/models";
import { Deck } from "core/deck";
import { Page } from "pages/page";
import React from "react";

function getCards(): ICard[] {
  const deck = new Deck()
  
  return []
}

export class SinglePlayerPage implements Page {
  component: React.ReactElement = <h1>oh hi</h1>;
  cards: ICard[] = getCards();
}

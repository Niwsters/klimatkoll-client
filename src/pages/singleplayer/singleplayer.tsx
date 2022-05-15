import { ICard } from "@shared/models";
import { Page } from "pages/page";
import React from "react";

export class SinglePlayerPage implements Page {
  component: React.ReactElement = <h1>oh hi</h1>;
  cards: ICard[] = [];
}

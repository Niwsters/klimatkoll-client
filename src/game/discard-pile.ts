import { Card } from "./card";
import { DISCARD_PILE_POSITION } from "./constants";

export class DiscardPile {
  private topCard?: Card

  get cards(): Card[] {
    if (!this.topCard) return []
    return [this.topCard]
  }

  constructor(topCard: Card | undefined = undefined) {
    this.topCard = topCard
  }

  setTopCard(card: Card, currentTime: number): DiscardPile {
    const [x, y] = DISCARD_PILE_POSITION
    card = Card.move(card, x, y, currentTime)
    card = Card.rotateGlobal(card, 0, currentTime)
    card = Card.rotateLocal(card, 0, currentTime)
    card.flipped = true
    card.container = "discard-pile"

    return new DiscardPile(card)
  }

  update(currentTime: number) {
    const topCard = this.topCard
    if (topCard !== undefined)
      return new DiscardPile(topCard.update(currentTime))

    return new DiscardPile(topCard)
  }
}

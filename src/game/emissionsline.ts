import { Card, SpaceCard } from './card'

export class EmissionsLine {
  cardOrder: number[] = []
  _cards: Card[] = []

  private new(): EmissionsLine {
    return Object.assign(new EmissionsLine(), this)
  }

  private get spaceCards(): SpaceCard[] {
    return this.cardOrder
      .filter(cardID => cardID < 0)
      .reduce((spaceCards: Card[], _: number, i: number) => {
        return [
          ...spaceCards,
          new SpaceCard(-1-i)
        ]
      }, [])
  }

  get cards() {
    return [...this._cards, ...this.spaceCards]
  }

  addCard(card: Card, position: number): EmissionsLine {
    const self = this.new()

    // Make sure card is flipped
    card.flipped = true

    self.cardOrder = [
       ...self.cardOrder.slice(0, position+1),
      card.id,
      ...self.cardOrder.slice(position+1, self.cardOrder.length)
    ]

    self.cardOrder = self.cardOrder
      .filter(cardID => cardID >= 0)
      .reduce((elCardOrder, cardID, i) => {
        return [
          ...elCardOrder,
          ...[cardID, -1-(i+1)]
        ]
      }, [-1])


    self._cards = [...self._cards, card]

    return self
  }
}

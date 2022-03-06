import { Card, SpaceCard } from './card'
import { EMISSIONS_LINE_MAX_LENGTH, EMISSIONS_LINE_POSITION } from './constants'

function insert(array: any[], item: any, position: number): any[] {
  return [
    ...array.slice(0, position+1),
    item,
    ...array.slice(position+1, array.length)
  ]
}

export class EmissionsLine {
  private _cards: Card[] = []

  private new(): EmissionsLine {
    return Object.assign(new EmissionsLine(), this)
  }

  private getEmissionsLineWidth(): number {
    const cardCount = this.cards.length
    const cardWidth = Card.DEFAULT_WIDTH * Card.DEFAULT_SCALE
    const totalELWidth = cardWidth * cardCount
    let width = cardWidth / 2
    if (totalELWidth > EMISSIONS_LINE_MAX_LENGTH) {
      width = (EMISSIONS_LINE_MAX_LENGTH - cardWidth) / (cardCount-1)
    }
    return width
  }

  private moveELCard(card: Card, i: number, currentTime: number): Card {
    let elCards = this.cards
    const cardCount = elCards.length
    const width = this.getEmissionsLineWidth()
    const startOffset = 0 - width*cardCount/2 - width/2

    const x = EMISSIONS_LINE_POSITION[0] + startOffset + width * (i+1)
    const y = EMISSIONS_LINE_POSITION[1]
    return Card.move(card, x, y, currentTime)
  }
  
  private reformSpaceCards(): Card[] {
    return this._cards
      .filter(c => c.id >= 0)
      .reduce((cards: Card[], card, i) => {
        return [
          ...cards,
          card,
          new SpaceCard(-1-(i+1))
        ]
      }, [new SpaceCard(-1)])
  }

  get cards() {
    return this._cards
  }

  addCard(card: Card, position: number, currentTime: number): EmissionsLine {
    let self = this.new()

    // Make sure card is flipped
    card.flipped = true

    self._cards = insert(self._cards, card, position)
    self._cards = self.reformSpaceCards()

    self._cards = self._cards.map((card, i) => {
      return self.moveELCard(card, i, currentTime)
    })

    return self
  }

  update(time: number): EmissionsLine {
    let self = this.new()
    self._cards = self._cards.map(c => Card.update(c, time))
    return self
  }

  mouse_moved(mouseX: number, mouseY: number, currentTime: number): EmissionsLine {
    let self = this.new()

    const lowerBounds = EMISSIONS_LINE_POSITION[1] - Card.DEFAULT_HEIGHT * Card.DEFAULT_SCALE / 2
    const upperBounds = EMISSIONS_LINE_POSITION[1] + Card.DEFAULT_HEIGHT * Card.DEFAULT_SCALE / 2

    self._cards = self._cards.map(c => {
      if (c.isSpace) return c

      if (mouseY > lowerBounds && mouseY < upperBounds)
        return Card.scale(c, Card.DEFAULT_SCALE * 2, currentTime)

      return Card.scale(c, Card.DEFAULT_SCALE, currentTime)
    })

    return self
  }
}

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

  private get width(): number {
    let leftCard: Card | undefined
    let rightCard: Card | undefined
    for (const card of this.nonSpaceCards) {
      if (!leftCard)
        leftCard = card

      if (!rightCard)
        rightCard = card

      if (card.position[0] < leftCard.position[0])
        leftCard = card

      if (card.position[0] > rightCard.position[0])
        rightCard = card
    }

    if (!leftCard || !rightCard)
      return 0

    const cardWidth = Card.DEFAULT_WIDTH * Card.DEFAULT_SCALE
    const x1 = leftCard.position[0] - cardWidth / 2
    const x2 = rightCard.position[0] + cardWidth / 2

    return x2 - x1 
  }

  private getEmissionsLineCardDistance(): number {
    const cardCount = this.cards.length
    const cardWidth = Card.DEFAULT_WIDTH * Card.DEFAULT_SCALE
    const totalELWidth = cardWidth * cardCount
    let cardDistance = cardWidth / 2
    if (totalELWidth > EMISSIONS_LINE_MAX_LENGTH) {
      cardDistance = (EMISSIONS_LINE_MAX_LENGTH - cardWidth) / (cardCount-1)
    }
    return cardDistance
  }

  private moveELCard(card: Card, i: number, currentTime: number): Card {
    let elCards = this.cards
    const cardCount = elCards.length
    const width = this.getEmissionsLineCardDistance()
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

  private get nonSpaceCards(): Card[] {
    return this.cards.filter(c => !c.isSpace)
  }

  private getClosestCard(x: number): Card {
    let self = this

    let closest: Card = self.nonSpaceCards[0]
    for (const card of self.nonSpaceCards.slice(1)) {
      if (!closest) {
        closest = card
        continue
      }

      if (Math.abs(card.position[0] - x) < Math.abs(closest.position[0] - x)) {
        closest = card
      }
    }

    return closest
  }

  private scaleCard(card: Card, mouseX: number, mouseY: number, currentTime: number): Card {
    if (card.isSpace) return card

    const lowerBoundsY = EMISSIONS_LINE_POSITION[1] - Card.DEFAULT_HEIGHT * Card.DEFAULT_SCALE / 2
    const upperBoundsY = EMISSIONS_LINE_POSITION[1] + Card.DEFAULT_HEIGHT * Card.DEFAULT_SCALE / 2

    const lowerBoundsX = EMISSIONS_LINE_POSITION[0] - this.width / 2
    const upperBoundsX = EMISSIONS_LINE_POSITION[0] + this.width / 2

    if (
      mouseX > lowerBoundsX &&
      mouseX < upperBoundsX &&
      mouseY > lowerBoundsY &&
      mouseY < upperBoundsY &&
      card.id === this.getClosestCard(mouseX).id
    ) {
      return Card.scale(card, Card.DEFAULT_SCALE * 2, currentTime)
    }

    return Card.scale(card, Card.DEFAULT_SCALE, currentTime)
  }

  mouse_moved(mouseX: number, mouseY: number, currentTime: number): EmissionsLine {
    let self = this.new()

    if (self.nonSpaceCards.length < 0)
      return self

    self._cards = self._cards.map(card => 
      self.scaleCard(card, mouseX, mouseY, currentTime)
    )

    return self
  }
}

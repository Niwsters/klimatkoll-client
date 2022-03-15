import { Card } from './card'
import {
  HAND_POSITION,
  HAND_CARD_ANGLE,
  HAND_X_RADIUS,
  HAND_Y_RADIUS,
  HAND_ANGLE_FACTOR
} from './constants'

function distance(a: number, b: number) {
  return Math.abs(a - b)
}

export class Hand {
  private _cards: Card[]

  private new(): Hand {
    return new Hand(this._cards)
  }

  private getCardAngle(i: number) {
    const n = this.cards.length - 1
    return HAND_CARD_ANGLE * (i - n/2)
  }

  private getCardPosition(i: number) {
    const angle = this.getCardAngle(i)
    const x = HAND_POSITION[0] + HAND_X_RADIUS * Math.sin(angle)
    const y = HAND_POSITION[1] - HAND_Y_RADIUS * Math.cos(angle)
    return [x, y]
  }

  private getCardRotation(i: number) {
    let angle = this.getCardAngle(i)
    return angle * HAND_ANGLE_FACTOR
  }

  constructor(cards: Card[] = []) {
    this._cards = cards
  }

  get cards(): Card[] {
    return this._cards
  }

  addCard(card: Card): Hand {
    return new Hand([...this._cards, card])
  }

  private closestCardToMouse(mouseX: number): Card | undefined {
    let closestCard: Card | undefined
    for (const card of this.cards) {
      if (!closestCard) closestCard = card

      if (distance(mouseX, card.position[0]) < distance(mouseX, closestCard.position[0]))
        closestCard = card
    }
    return closestCard
  }

  private zoomInOnCard(card: Card, currentTime: number): Card {
    card = Card.move(card, card.position[0], HAND_POSITION[1] - 230, currentTime)
    card = Card.scale(card, Card.DEFAULT_SCALE * 2, currentTime)
    card = Card.rotateGlobal(card, 0, currentTime)
    return card
  }

  private moveCardDefault(card: Card, cardIndex: number, currentTime: number): Card {
    const [x, y] = this.getCardPosition(cardIndex)
    const scale = Card.DEFAULT_SCALE
    const rotation = this.getCardRotation(cardIndex)
    card = Card.move(card, x, y, currentTime)
    card = Card.rotateGlobal(card, rotation, currentTime)
    // + 10 to prevent first card going under emissions line card when zooming out
    card.zLevel = cardIndex + 10
    return Card.scale(card, scale, currentTime)
  }

  private handWidth(): number {
    const leftCard = this.cards[0]
    const rightCard = this.cards[this.cards.length - 1]
    return rightCard.position[0] - leftCard.position[0] + Card.DEFAULT_WIDTH * Card.DEFAULT_SCALE
  }

  private readonly hoverYAxisLimit: number = HAND_POSITION[1] - Card.DEFAULT_HEIGHT * Card.DEFAULT_SCALE
  private isCardFocused(card: Card, mouseX: number, mouseY: number): boolean {
    const width = this.handWidth()
    const closestCard = this.closestCardToMouse(mouseX)
    return closestCard !== undefined &&
           card.id === closestCard.id &&
           mouseY > this.hoverYAxisLimit &&
           mouseX > HAND_POSITION[0] - width / 2 &&
           mouseX < HAND_POSITION[0] + width / 2
  }

  update(currentTime: number, mouseX: number, mouseY: number): Hand {
    let hand = this.new()

    hand._cards = hand.cards.map((card: Card, cardIndex: number) => {
      if (hand.isCardFocused(card, mouseX, mouseY))
        return hand.zoomInOnCard(card, currentTime)

      return hand.moveCardDefault(card, cardIndex, currentTime)
    })

    hand._cards = hand.cards.map(card => Card.update(card, currentTime))

    return hand
  }

  removeCard(card: Card): Hand {
    return new Hand(this.cards.filter(c => c.id !== card.id))
  }
}

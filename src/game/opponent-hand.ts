import { Card } from './card'
import {
  OPPONENT_HAND_POSITION,
  HAND_CARD_ANGLE,
  HAND_X_RADIUS,
  HAND_Y_RADIUS,
  HAND_ANGLE_FACTOR
} from './constants'

export class OpponentHand {
  private _cards: Card[]

  private new(): OpponentHand {
    return new OpponentHand(this._cards)
  }

  constructor(cards: Card[] = []) {
    this._cards = cards
  }

  get cards(): Card[] {
    return this._cards
  }

  addCard(card: Card): OpponentHand {
    return new OpponentHand([...this._cards, card])
  }

  update(currentTime: number): OpponentHand {
    const hand = this.new()

    let i = 0
    const n = hand.cards.filter(c => c.container === "opponent-hand").length - 1
    hand._cards = hand.cards.map((card: Card) => {
      const angle = HAND_CARD_ANGLE * (i - n/2) + Math.PI
      const x = OPPONENT_HAND_POSITION[0] + HAND_X_RADIUS * Math.sin(angle)
      const y = OPPONENT_HAND_POSITION[1] - HAND_Y_RADIUS * Math.cos(angle)

      card = Card.move(card, x, y, currentTime)
      card = Card.rotateGlobal(card, (angle + Math.PI) * HAND_ANGLE_FACTOR, currentTime)

      i += 1

      return card
    })

    hand._cards = hand._cards.map(card => Card.update(card, currentTime))

    return hand
  }
}

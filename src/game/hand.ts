import { Card } from './card'
import {
  HAND_POSITION,
  HAND_CARD_ANGLE,
  HAND_X_RADIUS,
  HAND_Y_RADIUS,
  HAND_ANGLE_FACTOR
} from './constants'

export class Hand {
  private _cards: Card[]

  private new(): Hand {
    return new Hand(this._cards)
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

  rearrange(currentTime: number, focusedCardID: number | undefined): Hand {
    let hand = this.new()

    const n = hand.cards.length - 1
    hand._cards = hand.cards.map((card: Card, i: number) => {
      card = {...card}

      let angle = HAND_CARD_ANGLE * (i - n/2)
      let x = HAND_POSITION[0] + HAND_X_RADIUS * Math.sin(angle)
      let y = HAND_POSITION[1] - HAND_Y_RADIUS * Math.cos(angle)
      let scale = Card.DEFAULT_SCALE

      // + 10 to prevent first card going under emissions line card when zooming out
      card.zLevel = i + 10 

      if (focusedCardID === card.id) {
        y = HAND_POSITION[1] - 230
        scale = Card.DEFAULT_SCALE * 2
        angle = 0
        card.zLevel = 999
      }

      card = Card.move(card, x, y, currentTime)
      card = Card.rotateGlobal(card, angle * HAND_ANGLE_FACTOR, currentTime)
      card = Card.scale(card, scale, currentTime)

      return card 
    })

    hand._cards = hand.cards.map(card => Card.update(card, currentTime))

    return hand
  }

  removeCard(card: Card): Hand {
    return new Hand(this.cards.filter(c => c.id !== card.id))
  }
}

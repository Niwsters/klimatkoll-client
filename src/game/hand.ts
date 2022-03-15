import { Card } from './card'
import {
  HAND_POSITION,
  HAND_CARD_ANGLE,
  HAND_X_RADIUS,
  HAND_Y_RADIUS,
  HAND_ANGLE_FACTOR
} from './constants'

function distance(a: [number, number], b: [number, number]): number {
  return Math.sqrt((a[0] - b[0])**2 + (a[1] - b[1])**2)
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

  update(currentTime: number, mouseX: number, mouseY: number): Hand {
    let hand = this.new()

    hand._cards = hand.cards.map((card: Card, i: number) => {
      card = {...card}


      // + 10 to prevent first card going under emissions line card when zooming out
      card.zLevel = i + 10 

      /*
      if (false) {
        y = HAND_POSITION[1] - 230
        scale = Card.DEFAULT_SCALE * 2
        angle = 0
        card.zLevel = 999
      }
      */

      let [x, y] = hand.getCardPosition(i)
      let scale = Card.DEFAULT_SCALE
      let rotation = hand.getCardRotation(i)

      if (distance([mouseX, mouseY], HAND_POSITION) < 100) {
        y = HAND_POSITION[1] - 230
        scale = Card.DEFAULT_SCALE * 2
        rotation = 0
        card.zLevel = 999
      }

      card = Card.move(card, x, y, currentTime)
      card = Card.rotateGlobal(card, rotation, currentTime)
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

import { GameState } from './gamestate'
import { Card } from './card'
import {
  HAND_POSITION,
  HAND_CARD_ANGLE,
  HAND_X_RADIUS,
  HAND_Y_RADIUS,
  HAND_ANGLE_FACTOR
} from './constants'

export class Hand {
  static rearrange(
    state: GameState,
    timePassed: number,
    currentTime: number = Date.now()
  ): GameState {
    let i = 0
    const n = state.cards.filter(c => c.container === "hand").length - 1
    state.cards = state.cards.map((card: Card) => {
      if (card.container !== "hand") return card

      let angle = HAND_CARD_ANGLE * (i - n/2)
      let x = HAND_POSITION[0] + HAND_X_RADIUS * Math.sin(angle)
      let y = HAND_POSITION[1] - HAND_Y_RADIUS * Math.cos(angle)
      let scale = Card.DEFAULT_SCALE

      // + 10 to prevent first card going under emissions line card when zooming out
      card.zLevel = i + 10 

      const focusedCardID = GameState.getFocusedCardID(state)
      if (focusedCardID === card.id) {
        y = HAND_POSITION[1] - 230
        scale = Card.DEFAULT_SCALE * 2
        angle = 0
        card.zLevel = 999
      }

      card = Card.move(card, x, y, currentTime)
      card = Card.rotateGlobal(card, angle * HAND_ANGLE_FACTOR, currentTime)
      card = Card.scale(card, scale, currentTime)

      i += 1

      return card 
    })

    return state
  }
}

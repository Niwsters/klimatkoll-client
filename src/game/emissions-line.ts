import { GameState } from './gamestate'
import { Card, SpaceCard, TransposeGoal } from './card'
import {
  EMISSIONS_LINE_POSITION,
  EMISSIONS_LINE_MAX_LENGTH
} from './constants'

export class EmissionsLine {
  static rearrange(
    state: GameState,
    timePassed: number
  ): GameState {
    state = {...state}

    let elCards = state.cards.filter(c => c.container === "emissions-line")
    const cardCount = elCards.length
    const cardWidth = Card.DEFAULT_WIDTH * Card.DEFAULT_SCALE
    const startOffset = 0 - cardWidth*cardCount/4 - cardWidth/4

    elCards = elCards.map((card: Card, i: number) => {
      const goal: TransposeGoal = {}

      goal.scale = Card.DEFAULT_SCALE
      goal.position = [
        EMISSIONS_LINE_POSITION[0] + startOffset + cardWidth/2 * (i+1),
        EMISSIONS_LINE_POSITION[1]
      ]

      card.zLevel = i
      card.visible = true
      if (card.isSpace) {
        if (!state.selectedCardID) card.visible = false

        card.name = "space"
        const selectedCard = state.cards.find(c => c.id == state.selectedCardID)
        if (selectedCard && GameState.getFocusedCardID(state) == card.id) {
          card.name = selectedCard.name
        }
      } else {
        if (!state.selectedCardID && GameState.getFocusedCardID(state) == card.id) {
          goal.scale = Card.DEFAULT_SCALE * 2
          card.zLevel = 999
        }
      }

      return Card.transpose(card, goal, timePassed)
    })

    return GameState.updateCards(state, elCards)
  }

  static add(state: GameState, card: Card, position: number = 0): GameState {
    state = {...state}
    const spaceCard = new SpaceCard(state)
    state.cards.push(card)
    state.cards.push(spaceCard)
    const cardOrder: number[] = state.emissionsLineCardOrder

    state.emissionsLineCardOrder = [
      ...cardOrder.slice(0, position),
      card.id,
      spaceCard.id,
      ...cardOrder.slice(position, cardOrder.length)
    ]

    return state
  }
}

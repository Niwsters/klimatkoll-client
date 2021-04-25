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

    const cardWidth = Card.DEFAULT_WIDTH * Card.DEFAULT_SCALE
    const cardCount = state.cards.filter(c => c.container === "emissions-line").length
    const startOffset = 0 - cardWidth*cardCount/4 - cardWidth/4

    let i = 0
    state.cards = state.cards.map((card: Card) => {
      if (card.container != "emissions-line") return card;

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

      i += 1
      return Card.transpose(card, goal, timePassed)
    })

    return state
  }

  static add(state: GameState, card: Card, position: number = 0): GameState {
    const spaceCard = new SpaceCard(state)

    if (state.cards.filter(c => c.container === "emissions-line").length == 0) {
      return {
        ...state,
        cards: [...state.cards, card, spaceCard]
      }
    }

    let i = 0;
    state.cards = state.cards.reduce((cards: Card[], c: Card) => {
      if (c.container != "emissions-line") return [...cards, c];

      if (i === position) {
        i += 1
        return [...cards, c, card, spaceCard]
      }

      i += 1
      return [...cards, c];
    }, [])

    return {
      ...state
    }
  }
}

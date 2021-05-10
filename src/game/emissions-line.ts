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

    let elCards = state.emissionsLineCardOrder
      .reduce((cards: Card[], cardID: number) => {
        const card = state.cards.find(c => c.id === cardID)
        if (!card) throw new Error("Can't find card with ID: " + cardID)
        return [...cards, card]
      }, [])
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

    // Flip card
    card.flipped = true

    // Add new card in specified position
    state.cards.push(card)
    state.emissionsLineCardOrder = [
      ...state.emissionsLineCardOrder.slice(0, position+1),
      card.id,
      ...state.emissionsLineCardOrder.slice(position+1, state.emissionsLineCardOrder.length)
    ]

    // Reset space cards
    state.emissionsLineCardOrder = state.emissionsLineCardOrder
      .filter(cardID => cardID >= 0)
      .reduce((elCardOrder, cardID, i) => {
        return [
          ...elCardOrder,
          ...[cardID, -1-(i+1)]
        ]
      }, [-1])

    state.cards = state.cards.filter(c => !c.isSpace)
    const missingSpaceCards = state.emissionsLineCardOrder
      .filter(cardID => cardID < 0)
      .reduce((spaceCards: Card[], cardID: number, i: number) => {
        const exists = state.cards.findIndex(c => c.id === cardID) > -1

        if (exists) return spaceCards

        return [
          ...spaceCards,
          new SpaceCard(-1-i)
        ]
      }, [])
    state.cards = [...state.cards, ...missingSpaceCards]

    return state
  }
}

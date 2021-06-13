import { Card, SpaceCard, transpose } from './card'
import { EmissionsLine } from './emissions-line'
import { GameState } from './gamestate'
import {
  ANIMATION_DURATION_MS,
  EMISSIONS_LINE_POSITION,
  EMISSIONS_LINE_MAX_LENGTH
} from './constants'

function getELCardPosition(i: number, cardCount: number): number[] {
  const cardWidth = Card.DEFAULT_WIDTH * Card.DEFAULT_SCALE
  const startOffset = 0 - cardWidth*cardCount/4 - cardWidth/4

  return [
    EMISSIONS_LINE_POSITION[0] + startOffset + cardWidth/2 * (i+1),
    EMISSIONS_LINE_POSITION[1]
  ]
}

describe('EmissionsLine', () => {
  describe('rearrange()', () => {
    it('sets space cards to invisible if no card is selected', () => {
      const state = new GameState()
      const sc = new SpaceCard(-1)
      state.selectedCardID = undefined
      state.cards = [sc]
      state.emissionsLineCardOrder = [-1]
      const result = EmissionsLine.rearrange(state, 0)

      expect(result.cards[0].visible).toEqual(false)
    })

    it('sets space cards to visible if card is selected', () => {
      const state = new GameState()
      const sc = new SpaceCard(-1)
      state.selectedCardID = 3
      state.cards = [sc]
      state.emissionsLineCardOrder = [-1]
      const result = EmissionsLine.rearrange(state, 0)

      expect(result.cards[0].visible).toEqual(true)
    })

    it('sets space cards to visible if selected card ID is 0', () => {
      const state = new GameState()
      const sc = new SpaceCard(-1)
      state.selectedCardID = 0
      state.cards = [sc]
      state.emissionsLineCardOrder = [-1]
      const result = EmissionsLine.rearrange(state, 0)

      expect(result.cards[0].visible).toEqual(true)
    })

    it('transposes emissions line cards to their proper positions', () => {
      const card = new Card(0, "blargh", "emissions-line")
      card.position = [1,1]
      const card2 = new Card(1, "1337", "emissions-line")
      card2.position = [2,2]
      const nonELCard = new Card(2, "honk", "hand")
      const state = new GameState()
      state.cards = [card, card2, nonELCard]
      state.emissionsLineCardOrder = [0,1]

      let result = EmissionsLine.rearrange(state, 0)
      expect(result.cards).toEqual([card, card2, nonELCard])

      let timePassed = ANIMATION_DURATION_MS/2
      result = EmissionsLine.rearrange(state, timePassed)
      let pos1 = getELCardPosition(0, 2)
      let pos2 = getELCardPosition(1, 2)
      expect(result.cards).toEqual([
        {
          ...card,
          position: [
            transpose(1, pos1[0], timePassed),
            transpose(1, pos1[1], timePassed)
          ]
        },
        {
          ...card2,
          position: [
            transpose(2, pos2[0], timePassed),
            transpose(2, pos2[1], timePassed)
          ]
        },
        nonELCard
      ])
    })

    it('puts cards in specified order', () => {
      const state = new GameState()

      const sc1 = new SpaceCard(-1)
      const sc2 = new SpaceCard(-2)
      const card = new Card(0, "blargh", "emissions-line")
      state.cards = [sc1, sc2, card]
      state.emissionsLineCardOrder = [-1, 0, -2]
      const result = EmissionsLine.rearrange(state, ANIMATION_DURATION_MS)

      // Sort by x-coordinate and see if order matches
      const positionalOrder = result.emissionsLineCardOrder
        .reduce((cards, cardID) => {
          return [...cards, result.cards.find(c => c.id === cardID)]
        }, [])
        .sort((a, b) => a.position[0] - b.position[0])
        .map(c => c.id)

      expect(positionalOrder).toEqual([-1, 0, -2])
    })

    it('does not go over max emissions line length', () => {
      const card = new Card(0, "a", "emissions-line")
      const card2 = new Card(1, "b", "emissions-line")
      const card3 = new Card(2, "c", "emissions-line")
      const card4 = new Card(3, "d", "emissions-line")
      const card5 = new Card(4, "e", "emissions-line")
      const card6 = new Card(5, "f", "emissions-line")
      const state = new GameState()
      state.cards = [
        card,
        card2,
        card3,
        card4,
        card5,
        card6
      ]
      state.emissionsLineCardOrder = [0, 1, 2, 3, 4, 5]

      const result = EmissionsLine.rearrange(state, ANIMATION_DURATION_MS)
      const cardWidth = Card.DEFAULT_WIDTH * Card.DEFAULT_SCALE
      const leftEdge = result.cards.find(c => c.id === 0).position[0] - cardWidth/2
      const rightEdge = result.cards.find(c => c.id === 5).position[0] + cardWidth/2

      expect(rightEdge - leftEdge).toEqual(EMISSIONS_LINE_MAX_LENGTH)
    })

    it('hover-zooms card if no card is selected', () => {
      const card = new Card(0, "a", "emissions-line")
      const state = new GameState()
      state.cards = [
        card
      ]
      state.emissionsLineCardOrder = [0]
      state.hoveredCardIDs = [0]

      const result = EmissionsLine
        .rearrange(state, ANIMATION_DURATION_MS)
        .cards
        .find(c => c.id === card.id)
        .scale

      expect(result).toEqual(Card.DEFAULT_SCALE*2)
    })

    it('does not hover-zoom card if card is selected', () => {
      const card = new Card(0, "a", "emissions-line")
      const state = new GameState()
      state.cards = [
        card
      ]
      state.emissionsLineCardOrder = [0]
      state.hoveredCardIDs = [0]
      state.selectedCardID = 1

      const result = EmissionsLine
        .rearrange(state, ANIMATION_DURATION_MS)
        .cards
        .find(c => c.id === card.id)
        .scale

      expect(result).toEqual(Card.DEFAULT_SCALE)
    })
  })

  describe('add()', () => {
    it('adds new card to emissions line', () => {
      const state = new GameState()

      const card = new Card(0, "blargh", "emissions-line")
      const card2 = new Card(1, "honk", "emissions-line")
      const card3 = new Card(2, "1337", "emissions-line")

      let result = EmissionsLine.add(state, card, 0)
      let expected = [-1, 0, -2]
      expect(result.emissionsLineCardOrder).toEqual(expected)
      expect(result.cards.filter(c => c.isSpace).length).toEqual(2)

      result = EmissionsLine.add(result, card2, 2)
      result = EmissionsLine.add(result, card3, 2)
      expected = [-1, 0, -2, 2, -3, 1, -4]
      expect(result.emissionsLineCardOrder).toEqual(expected)
    })

    it('flips card', () => {
      const state = new GameState()

      const card = new Card(0, "blargh", "emissions-line")
      card.flipped = false
      let result = EmissionsLine
        .add(state, card, 0)
        .cards
        .find(c => c.id === card.id)
      expect(result.flipped).toEqual(true)
    })
  })
})

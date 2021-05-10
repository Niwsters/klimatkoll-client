import { Card, SpaceCard } from './card'
import { EmissionsLine } from './emissions-line'
import { GameState } from './gamestate'
import { ANIMATION_DURATION_MS } from './constants'

describe('EmissionsLine', () => {
  describe('rearrange()', () => {
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

      result = EmissionsLine.rearrange(state, ANIMATION_DURATION_MS/2)
      expect(result.cards).toEqual([
        {
          ...card,
          position: [337.3046875, 202.75]
        },
        {
          ...card2,
          position: [383.4453125, 203]
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

import { Card } from './card'
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
  })
})

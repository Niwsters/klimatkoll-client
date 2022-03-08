import { Card } from '../game/card'
import { Hand } from '../game/hand'
import { Factory } from './test-factory'
import { GameState } from '../game/gamestate'
import { DECK_POSITION } from '../game/constants'

describe('draw_card', () => {
  let card: Card
  let state: GameState
  beforeEach(() => {
    card = new Card(0, "some-card", "hand")
    state = Factory.GameState()
    state.socketID = 3
    Hand.rearrange = (state: any) => { return state }
  })

  it("puts card in player's hand if socketID is player's socketID", () => {
    const event = Factory.event.draw_card(card.id, card.name, 3)
    const result = state.draw_card(event, 0)[0].cards[0]

    expect(result.position).toEqual(DECK_POSITION)
    expect(result.container).toEqual("hand")
  })

  it("puts card in opponent's hand if socketID is not player's socketID", () => {
    const event = Factory.event.draw_card(card.id, card.name, 4)
    const result = state.draw_card(event, 0)[0].cards[0]

    expect(result.position).toEqual(DECK_POSITION)
    expect(result.container).toEqual("opponent-hand")
  })
})

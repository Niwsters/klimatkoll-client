import { Card } from '../game/card'
import { Factory } from './test-factory'
import { GameState } from '../game/gamestate'
import { DISCARD_PILE_POSITION } from '../game/constants'
import { Event } from '../event/event'

describe('incorrect_card_placement', () => {
  let state: GameState
  beforeEach(() => {
    state = Factory.GameState()
  })

  it('throws specified card into discard pile', () => {
    const card = new Card(7, "blargh", "hand")
    card.rotation = 30
    card.rotationGoal.rotation = 30
    card.addedRotation = 15
    card.addedRotationGoal.addedRotation = 15
    card.position = [1, 1]
    const card2 = new Card(1, "blargh", "emissions-line")

    state.cards = [
      card,
      card2
    ]

    const event = new Event(0, "incorrect_card_placement", { cardID: 7 })

    const currentTime = 1337
    let result = state.incorrect_card_placement(event, currentTime)[0]
    expect(result.cards[1]).toEqual(card2)
    const movedCard = result.cards.find(c => c.id === card.id)

    expect(movedCard.container).toEqual("discard-pile")
    expect(movedCard.positionGoal).toEqual({
      position: DISCARD_PILE_POSITION,
      timestamp: currentTime
    })
    expect(movedCard.rotationGoal).toEqual({
      rotation: 0,
      timestamp: currentTime
    })
    expect(movedCard.addedRotationGoal).toEqual({
      addedRotation: 0,
      timestamp: currentTime
    })
  })

  it('deselects card', () => {
    state.selectedCardID = 7

    const card = new Card(7, "blargh", "hand")
    const card2 = new Card(1, "blargh", "emissions-line")

    state.cards = [
      card,
      card2
    ]

    const event = new Event(0, "incorrect_card_placement", { cardID: 7 })

    let timePassed = 0
    let result = state.incorrect_card_placement(event, timePassed)[0]
    expect(result.selectedCardID).toEqual(undefined)
  })

  it('flips card', () => {
    const card = new Card(7, "blargh", "hand")
    const card2 = new Card(1, "blargh", "emissions-line")

    state.cards = [
      card,
      card2
    ]

    const event = new Event(0, "incorrect_card_placement", { cardID: 7 })

    let timePassed = 0
    let result = state
      .incorrect_card_placement(event, timePassed)[0]
      .cards
      .find(c => c.id === card.id)
    expect(result.flipped).toEqual(true)
  })
})

import { Card } from '../game/card'
import { Factory } from './test-factory'
import { GameState } from '../game/gamestate'
import { DISCARD_PILE_POSITION } from '../game/constants'
import { Event } from '../event/event'
import { spec } from './spec'


function receiveEvent(state: GameState, card: Card): GameState {
  const event = new Event(0, "incorrect_card_placement", { cardID: card.id })
  return state.incorrect_card_placement(event, currentTime)[0]
}

const currentTime: number = 1337
const card = new Card(7, "blargh", "hand")
card.rotationGoal.rotation = 30
card.addedRotationGoal.addedRotation = 15

const test = spec('incorrect_card_placement')
  .when(() => {
    let state = Factory.GameState()
    state.hand = state.hand.addCard(card)
    state = receiveEvent(state, card)

    return state
  })

const cardTest = test.when((state: GameState) => state.cards.find(c => c.id === card.id))
cardTest.expect((c: Card) => c.container).toEqual("discard-pile")
cardTest.expect((c: Card) => c.positionGoal).toEqual({ position: DISCARD_PILE_POSITION, timestamp: currentTime })
cardTest.expect((c: Card) => c.rotationGoal).toEqual({ rotation: 0, timestamp: currentTime })
cardTest.expect((c: Card) => c.addedRotationGoal).toEqual({ addedRotation: 0, timestamp: currentTime })
cardTest.expect((c: Card) => c.flipped).toEqual(true)

test.expect((state: GameState) => state.hand.cards).toEqual([])

test.when((state: GameState) => {
  state.selectedCardID = card.id
  state = receiveEvent(state, card)
  return state
}).expect((state: GameState) => state.selectedCardID).toEqual(undefined)

test.when((state: GameState) => {
  const card = new Card(6, "honk", "opponent-hand")
  state.opponentHand = state.opponentHand.addCard(card)
  state = receiveEvent(state, card)
  expect(state.opponentHand.cards).toEqual([])
  return state
}).expect((state: GameState) => state.opponentHand.cards).toEqual([])

describe('', () => it('', () => {}))

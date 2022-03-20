import { Card } from '../game/card'
import { Factory } from './test-factory'
import { GameState } from '../game/gamestate'
import { ANIMATION_DURATION_MS, DISCARD_PILE_POSITION } from '../game/constants'
import { Event } from '../event/event'
import { spec } from './spec'

function receiveEvent(state: GameState, card: Card): GameState {
  const event = new Event(0, "incorrect_card_placement", { cardID: card.id })
  return state.incorrect_card_placement(event, currentTime)[0]
}

const currentTime: number = 0
const card = new Card(7, "blargh")

export default function main() {
  card.rotation = 30
  card.addedRotation = 15

  const test = spec()
    .when(() => {
      let state = Factory.GameState()
      state.hand = state.hand.addCard(card)
      state = receiveEvent(state, card)

      return state.update(0).update(ANIMATION_DURATION_MS)
    })

  const cardTest = test.when((state: GameState) => state.cards.find(c => c.id === card.id))
  cardTest.expect((c: Card) => c.position).toEqual(DISCARD_PILE_POSITION)
  cardTest.expect((c: Card) => c.rotation).toEqual(0)
  cardTest.expect((c: Card) => c.addedRotation).toEqual(0)
  cardTest.expect((c: Card) => c.flipped).toEqual(true)

  test.expect((state: GameState) => state.hand.cards).toEqual([])

  test.when((state: GameState) => {
    state.selectedCardID = card.id
    state = receiveEvent(state, card)
    return state
  }).expect((state: GameState) => state.selectedCardID).toEqual(undefined)

  test.when((state: GameState) => {
    const card = new Card(6, "honk")
    state.opponentHand = state.opponentHand.addCard(card)
    state = receiveEvent(state, card)
    return state
  }).expect((state: GameState) => state.opponentHand.cards).toEqual([])
}

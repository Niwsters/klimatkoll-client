import { Card } from '../pages/game/core/card'
import { Factory } from './test-factory'
import { GameState } from '../pages/game/core/gamestate'
import { DECK_POSITION } from '../pages/game/core/constants'
import { spec } from './spec'
import { Event } from '../event/event'


function createEvent(socketID: number): Event {
  return new Event(0, "draw_card", { card: card, socketID })
}

function drawCard(state: GameState, socketID: number): GameState {
  return state.draw_card(createEvent(socketID))[0]
}

const card = new Card(0, "some-card")

export default function main() {
  const test = spec()
    .when(() => {
      const state = Factory.GameState()
      state.socketID = 3
      return state
    })

  const playerHand = test
    .when(state => drawCard(state, 3))

  // Puts card in player's hand
  playerHand
    .expect((state: GameState) => state.hand.cards.map(c => c.id))
    .toEqual([card.id])

  // Puts card initiallity at deck position
  playerHand
    .expect((state: GameState) => state.hand.cards[0].position)
    .toEqual(DECK_POSITION)

  // Puts card in opponent's hand
  test
    .when(state => drawCard(state, 4))
    .expect((state: GameState) => state.opponentHand.cards.map(c => c.id))
    .toEqual([card.id])
}

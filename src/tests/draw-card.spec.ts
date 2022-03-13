import { Card } from '../game/card'
import { Factory } from './test-factory'
import { GameState } from '../game/gamestate'
import { DECK_POSITION } from '../game/constants'
import { spec } from './spec'
import { Event } from '../event/event'

const card = new Card(0, "some-card", "hand")
function createEvent(socketID: number): Event {
  return new Event(0, "draw_card", { card: card, socketID })
}

function drawCard(state: GameState, socketID: number): GameState {
  return state.draw_card(createEvent(socketID))[0]
}

const test = spec('Draw card')
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

describe('', () => it('', () => {}))

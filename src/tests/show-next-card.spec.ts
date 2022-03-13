import { Event } from '../event/event'
import { Card } from '../game/card'
import { DECK_POSITION } from '../game/constants'
import { GameState } from '../game/gamestate'
import { Factory } from './test-factory'
import { spec } from './spec'

function nextCard(state: GameState, card: Card): GameState {
  const event = new Event(0, "next_card", {card})
  return state.next_card(event)[0]
}

const card = new Card(13, "blargh", "deck")
card.position = DECK_POSITION
const card2 = new Card(1, "honk", "deck")
card2.position = DECK_POSITION

const test = spec('Next card')
  .when(() => nextCard(Factory.GameState(), card))

// Creates a new deck card if none exists
test
  .expect(state => state.cards)
  .toEqual([card])

// Replaces existing deck card
test
  .when(state => nextCard(state, card2))
  .expect(state => state.cards)
  .toEqual([card2])

describe('', () => it('', () => {}))

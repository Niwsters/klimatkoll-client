import { Card } from '../game/card'
import { Event, EventToAdd } from '../event/event'
import { GameState } from '../game/gamestate'
import { Factory } from './test-factory'
import { spec } from './spec'

function playCard(state: GameState, card: Card, position: number): [GameState, EventToAdd[]] {
  const event = new Event(0, 'card_played_from_deck', {
    card: card,
    position: position
  })
  return state.card_played_from_deck(event)
}

const card = new Card(0, "blargh", "emissions-line")
const card2 = new Card(1, "honk", "emissions-line")
const card3 = new Card(2, "1337", "emissions-line")

const test = spec('card_played_from_deck').when(() => Factory.GameState())

// adds card to emissions line
test.when((state: GameState) => playCard(state, card, 0)[0])
    .expect((state: GameState) => state.emissionsLine.cards.map(c => c.id))
    .toEqual([-1, card.id, -2])

// adds card to given position
test
  .when((state: GameState) => {
    state = playCard(state, card, 0)[0]
    state = playCard(state, card2, 2)[0]
    state = playCard(state, card3, 2)[0]
    return state
  })
  .expect((state: GameState) => state.emissionsLine.cards.filter(c => !c.isSpace).map(c => c.id))
  .toEqual([card.id, card3.id, card2.id])

// flips card
test
  .when((state: GameState) => {
    card.flipped = false
    state = playCard(state, card, 0)[0]
    return state
  })
  .expect((state: GameState) => state.cards.find(c => c.id === card.id).flipped)
  .toEqual(true)

describe('', () => it('', () => {}))

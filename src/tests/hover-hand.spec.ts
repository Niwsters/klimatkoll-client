import { MouseMovedEvent } from "../event/event"
import { Card } from "../game/card"
import { ANIMATION_DURATION_MS, HAND_POSITION } from "../game/constants"
import { GameState } from "../game/gamestate"
import { Factory } from './test-factory'
import { spec } from './spec'

function moveMouse(state: GameState, x: number, y: number): GameState {
  const event = {...new MouseMovedEvent(x, y), event_id: 0}
  state = state.mouse_moved(event)[0]
  state = state.update(currentTime + ANIMATION_DURATION_MS)
  return state
}

function getCard(state: GameState): Card | undefined {
  return state.cards.find(c => c.id === card.id)
}

function scale(state: GameState): number | undefined {
  return getCard(state)?.scaleGoal.scale
}

function rotation(state: GameState): number | undefined {
  return getCard(state)?.rotationGoal.rotation
}

function position(state: GameState): [number, number] | undefined {
  return getCard(state)?.positionGoal.position
}

const currentTime = 1337
const card = new Card(0, "some-card", "emissions-line")

export default function main() {
  const test = spec()
    .when(() => {
      const state = Factory.GameState()
      state.hand = state.hand.addCard(card)
      return state
    })

  const hovering = test
    .when((state: GameState) => {
      const [x, y] = HAND_POSITION
      return moveMouse(state, x, y)
    })

  // zooms in on card
  hovering
    .expect(scale)
    .toEqual(Card.DEFAULT_SCALE * 2)

  hovering
    .expect(rotation)
    .toEqual(0)

  hovering
    .expect(position)
    .toEqual([HAND_POSITION[0], HAND_POSITION[1] - 230])

    /*
  // doesn't zoom in on surrounding cards
  hovering
    .expect((state: GameState) => unique(getOtherCards(state).map(c => c.scaleGoal.scale)))
    .toEqual([Card.DEFAULT_SCALE])
    */
}

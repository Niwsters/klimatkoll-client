import { MouseMovedEvent } from "../event/event"
import { Card } from "../game/card"
import { ANIMATION_DURATION_MS, EMISSIONS_LINE_POSITION } from "../game/constants"
import { GameState } from "../game/gamestate"
import { Factory } from './test-factory'

describe('Hovering EmissionsLine cards', () => {
  const currentTime = 1337
  const card = new Card(0, "some-card", "emissions-line")

  let state: GameState
  beforeEach(() => {
    state = Factory.GameState()
    state.emissionsLine = state.emissionsLine.addCard(card, 0, currentTime)
  })

  function moveMouse(state: GameState, x: number, y: number): GameState {
    const event = {...new MouseMovedEvent(x, y), event_id: 0}
    state = state.mouse_moved(event)[0]
    state = state.update(currentTime + ANIMATION_DURATION_MS)
    return state
  }

  function getCardScale(state: GameState, cardID: number) {
    return state.emissionsLine.cards.find(c => c.id === cardID).scaleGoal.scale
  }

  it("zooms in on emissions line card", () => {
    const [x, y] = EMISSIONS_LINE_POSITION
    state = moveMouse(state, x, y)

    // Zooms in on middle card
    expect(getCardScale(state, card.id)).toEqual(Card.DEFAULT_SCALE * 2)
  })

  it("doesn't zoom in on surrounding cards", () => {
    const [x, y] = EMISSIONS_LINE_POSITION
    state = moveMouse(state, x, y)

    const otherCards = state.emissionsLine.cards.filter(c => c.id !== card.id)
    for (const card of otherCards) {
      expect(getCardScale(state, card.id)).toEqual(Card.DEFAULT_SCALE)
    }

    expect(getCardScale(state, card.id)).toEqual(Card.DEFAULT_SCALE * 2)
  })

  it("zooms out if mouse moves outside emissions line Y bounds", () => {
    const [x, y] = EMISSIONS_LINE_POSITION
    state = moveMouse(state, x, y)

    // Move mouse outside emissions line
    state = moveMouse(state, 0, 0)

    expect(getCardScale(state, card.id)).toEqual(Card.DEFAULT_SCALE)
  })

  it("zooms in only on the closest card to the mouse", () => {
    const card2 = new Card(1, "other-card", "emissions-line")
    card2.position = EMISSIONS_LINE_POSITION
    state.emissionsLine = state.emissionsLine.addCard(card2, 2, currentTime)

    const [x, y] = [card2.position[0], EMISSIONS_LINE_POSITION[1]]
    state = moveMouse(state, x, y)

    expect(getCardScale(state, card.id)).toEqual(Card.DEFAULT_SCALE * 2)
    expect(getCardScale(state, card2.id)).toEqual(Card.DEFAULT_SCALE)
  })

  it("zooms in only if mouse is within emissions line x-axis", () => {
    const y = EMISSIONS_LINE_POSITION[1]
    state = moveMouse(state, 0, y)

    expect(getCardScale(state, card.id)).toEqual(Card.DEFAULT_SCALE)
  })
})

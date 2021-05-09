import { vec2, mat2 } from 'gl-matrix'
import { Card } from '../game/card'
import { Event } from '../game/event'
import { GameState } from './gamestate'

export class Mouse {
  static intersects(card: Card, original_mouse_position: vec2): boolean {
    // Copy values so that we don't overwrite them
    let mouse_position: vec2 = vec2.create()
    vec2.copy(mouse_position, original_mouse_position)
    let card_position = vec2.fromValues(card.position[0], card.position[1])

    // Get mouse coordinates relative to card rotation and position
    const origin = vec2.fromValues(0, 0)
    vec2.rotate(mouse_position, mouse_position, origin, -card.rotation)
    vec2.rotate(card_position, card_position, origin, -card.rotation)
    vec2.subtract(mouse_position, mouse_position, card_position)

    // Check if mouse is within card width and height
    const rect = Card.getRectangle(card)
    if (
      // within width
      mouse_position[0] > rect[0][0] && mouse_position[0] < rect[1][0] &&
      // within height
      mouse_position[1] > rect[0][1] && mouse_position[1] < rect[1][1]
    ) {
      return true
    }

    return false
  }
  /*

  static onClicked(
    state: GameState,
    mousePosition: vec2,
    clientEvents: ClientEvent[],
    currentTime: number
  ): Command {
    return GameState.newCommand(
      state,
      clientEvents,
      currentTime,
      "mouse_clicked",
      {
        x: mousePosition[0],
        y: mousePosition[1]
      })
  }
  */

  // TODO: Unit test this
  static onMoved(
    state: GameState,
    hoveredCardIDs: Set<number>,
    mousePosition: vec2,
    currentTime: number
  ): {
    events: Event[],
    hoveredCardIDs: Set<number>
  } {
    let events: Event[] = []
    state.cards.forEach((card: Card) => {
      if (Mouse.intersects(card, mousePosition)) {
        // If card not already hovered, add card_hovered event
        if (!hoveredCardIDs.has(card.id)) {

          // If hand card is selected, ignore non-space cards
          if (state.selectedCardID) {
            if (card.container === "emissions-line" && !card.isSpace) return
          // Else, ignore space cards
          } else {
            if (card.container === "emissions-line" && card.isSpace) return
          }

          events.push({
            event_type: "card_hovered",
            payload: { card_id: card.id },
            timestamp: currentTime
          })
        }

        hoveredCardIDs.add(card.id)
      } else {
        // If card is hovered, add card_unhovered event
        if (hoveredCardIDs.has(card.id)) {
          events.push({
            event_type: "card_unhovered",
            payload: { card_id: card.id },
            timestamp: currentTime
          })
        }

        hoveredCardIDs.delete(card.id)
      }
    })

    return {
      events: events,
      hoveredCardIDs: hoveredCardIDs
    }
  }
}

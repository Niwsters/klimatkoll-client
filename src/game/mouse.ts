import { vec2, mat2 } from 'gl-matrix'
import { Card } from '../game/card'
import { ClientEvent, GameState } from './gamestate'

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

  static onClicked(
    state: GameState,
    mousePosition: vec2,
    clientEvents: ClientEvent[],
    currentTime: number
  ): ClientEvent[] {
    return GameState.addClientEvent(
      "mouse_clicked",
      {
        x: mousePosition[0],
        y: mousePosition[1]
      },
      clientEvents,
      currentTime)
  }

  static onMoved(
    state: GameState,
    hoveredCardIDs: Set<number>,
    mousePosition: vec2,
    clientEvents: ClientEvent[],
    currentTime: number
  ): {
    clientEvents: ClientEvent[],
    hoveredCardIDs: Set<number>
  } {
    clientEvents = [...clientEvents]
    state.cards.forEach((card: Card) => {
      if (Mouse.intersects(card, mousePosition)) {
        // If card not already hovered, add card_hovered event
        if (!hoveredCardIDs.has(card.id)) {

          // If hand card is selected, ignore non-space cards
          if (state.selectedCardID) {
            if (card.container == "emissions-line" && !card.isSpace) return
          // Else, ignore space cards
          } else {
            if (card.container == "emissions-line" && card.isSpace) return
          }

          clientEvents = GameState.addClientEvent(
            "card_hovered",
            { card_id: card.id },
            clientEvents,
            currentTime)
        }

        hoveredCardIDs.add(card.id)
      } else {
        // If card is hovered, add card_unhovered event
        if (hoveredCardIDs.has(card.id)) {
          clientEvents = GameState.addClientEvent(
            "card_unhovered",
            { card_id: card.id },
            clientEvents,
            currentTime)
        }

        hoveredCardIDs.delete(card.id)
      }
    })

    return {
      clientEvents: clientEvents,
      hoveredCardIDs: hoveredCardIDs
    }
  }
}

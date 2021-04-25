import React from 'react'
import { BehaviorSubject } from 'rxjs'
import { vec2 } from 'gl-matrix'

import { ClientEvent, GameState } from './game/gamestate'
import { Card } from './game/card'
import { Canvas } from './canvas/canvas'
import { cards } from './cards'
import { Mouse } from './game/mouse'

interface Props {
  events$: BehaviorSubject<ClientEvent[]>,
  canvasElem?: HTMLCanvasElement
}

export function Game(props: Props) {
  const events$ = props.events$
  const canvasElem = props.canvasElem
  if (!canvasElem) return <div>LOADING</div>

  let i = 0

  const canvas = new Canvas(canvasElem)
  canvas.prepare().then(() => {
    const hoveredCardIDs = new Set<number>();
    canvasElem.onmousemove = (e: MouseEvent) => {
      const elem = e.target as HTMLElement
      if (!elem) throw new Error("e.target is null")
      const rect = elem.getBoundingClientRect()
      const mousePosition = vec2.fromValues(e.clientX - rect.left, e.clientY - rect.top)

      const state = GameState.fromEvents(events$.value)
      let newEvents = [...events$.value]
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

            newEvents.push({
              event_id: 99999 + i,
              event_type: "card_hovered",
              payload: {
                card_id: card.id
              },
              timestamp: Date.now()
            })
            i += 1
          }

          hoveredCardIDs.add(card.id)
        } else {
          // If card is hovered, add card_unhovered event
          if (hoveredCardIDs.has(card.id)) {
            newEvents.push({
              event_id: 99999 + i,
              event_type: "card_unhovered",
              payload: {
                card_id: card.id
              },
              timestamp: Date.now()
            })
            i += 1
          }

          hoveredCardIDs.delete(card.id)
        }
      })

      events$.next(newEvents)
    }

    canvasElem.onclick = (e: MouseEvent) => {
      const elem = e.target as HTMLElement
      if (!elem) throw new Error("e.target is null")
      const rect = elem.getBoundingClientRect()

      const newEvents = [
        ...events$.value,
        {
          event_id: 99999 + i,
          event_type: "mouse_clicked",
          payload: {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
          },
          timestamp: Date.now()
        }
      ]
      i += 1
      events$.next(newEvents)
    }

    setInterval(() => {
      const state = GameState.fromEvents(events$.value)
      canvas.render(state)
    }, 1000/60)
  })

  return (
    <div></div>
  );
}

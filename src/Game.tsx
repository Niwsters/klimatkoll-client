import React from 'react'
import { BehaviorSubject } from 'rxjs'
import { vec2 } from 'gl-matrix'

import { ClientEvent, GameState } from './game/gamestate'
import { Card } from './game/card'
import { Canvas } from './canvas/canvas'
import { cards } from './cards'
import { Mouse } from './ui/mouse'

interface Props {
  events$: BehaviorSubject<ClientEvent[]>,
}

export function Game(props: Props) {
  const events$ = props.events$

  let i = 0
  Canvas.prepare().then(() => {
    const canvas = new Canvas()

    const canvasElem = document.getElementById('klimatkoll-canvas') as HTMLCanvasElement
    if (!canvasElem) throw new Error("Can't find canvas element")
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

      const card_i = Math.floor(Math.random()*cards.length)
      const newEvents = [
        ...events$.value,
        {
          event_id: 99999+i,
          event_type: 'draw_card',
          payload: {
            card: cards[card_i],
            socketID: 0,
          },
          timestamp: Date.now()
        }
        /*
        {
          event_id: 99999 + i,
          event_type: "mouse_clicked",
          payload: {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            timestamp: Date.now()
          }
        }
        */
      ]
      i += 1
      events$.next(newEvents)
    }

    setInterval(() => {
      const state = GameState.fromEvents(events$.value)
      canvas.render(state)
    }, 1000/60)

    /*
    gamestate$.subscribe((state: GameState) => {
      canvas.render(state)
    })
    */
  })

  return (
    <div></div>
  );
}

/* Sample server events for testing. This describes a full game from start to game over.
[
  GameEvent {
    event_id: 0,
    event_type: 'waiting_for_players',
    payload: {}
  },
  GameEvent { event_id: 1, event_type: 'playing', payload: {} },
  GameEvent {
    event_id: 2,
    event_type: 'draw_card',
    payload: {
      card: { name: 'bussresa-malmo-chamonix', emissions: 60, id: 7 },
      socketID: 0
    }
  },
  GameEvent {
    event_id: 3,
    event_type: 'draw_card',
    payload: {
      card: { name: 'laderskor', emissions: 160, id: 25 },
      socketID: 0
    }
  },
  GameEvent {
    event_id: 4,
    event_type: 'draw_card',
    payload: {
      card: { name: 'blandkost-kyckling', emissions: 1000, id: 6 },
      socketID: 0
    }
  },
  GameEvent {
    event_id: 5,
    event_type: 'draw_card',
    payload: {
      card: { name: 'rosor-kenya', emissions: 50, id: 40 },
      socketID: 1
    }
  },
  GameEvent {
    event_id: 6,
    event_type: 'draw_card',
    payload: { card: { name: 'grot', emissions: 60, id: 20 }, socketID: 1 }
  },
  GameEvent {
    event_id: 7,
    event_type: 'draw_card',
    payload: {
      card: { name: 'duscha-15min', emissions: 500, id: 11 },
      socketID: 1
    }
  },
  GameEvent {
    event_id: 8,
    event_type: 'card_played_from_deck',
    payload: { card: { name: 'vegan', emissions: 500, id: 50 }, position: 0 }
  },
  GameEvent {
    event_id: 9,
    event_type: 'player_turn',
    payload: { socketID: 0 }
  },
  GameEvent {
    event_id: 10,
    event_type: 'next_card',
    payload: { card: { name: 'blandkost-kor', emissions: 4500, id: 5 } }
  },
  GameEvent {
    event_id: 11,
    event_type: 'player_turn',
    payload: { socketID: 1 }
  },
  GameEvent {
    event_id: 12,
    event_type: 'card_played_from_hand',
    payload: { socketID: 0, cardID: 7, position: 0 }
  },
  GameEvent {
    event_id: 13,
    event_type: 'player_turn',
    payload: { socketID: 0 }
  },
  GameEvent {
    event_id: 14,
    event_type: 'incorrect_card_placement',
    payload: { cardID: 40, socketID: 1 }
  },
  GameEvent {
    event_id: 15,
    event_type: 'draw_card',
    payload: {
      card: { name: 'blandkost-kor', emissions: 4500, id: 5 },
      socketID: 1
    }
  },
  GameEvent {
    event_id: 16,
    event_type: 'next_card',
    payload: { card: { name: 'paketfrakt-flyg-kina', emissions: 250, id: 30 } }
  },
  GameEvent {
    event_id: 17,
    event_type: 'player_turn',
    payload: { socketID: 1 }
  },
  GameEvent {
    event_id: 18,
    event_type: 'card_played_from_hand',
    payload: { socketID: 0, cardID: 25, position: 2 }
  },
  GameEvent {
    event_id: 19,
    event_type: 'player_turn',
    payload: { socketID: 0 }
  },
  GameEvent {
    event_id: 20,
    event_type: 'incorrect_card_placement',
    payload: { cardID: 20, socketID: 1 }
  },
  GameEvent {
    event_id: 21,
    event_type: 'draw_card',
    payload: {
      card: { name: 'paketfrakt-flyg-kina', emissions: 250, id: 30 },
      socketID: 1
    }
  },
  GameEvent {
    event_id: 22,
    event_type: 'next_card',
    payload: {
      card: { name: 'flygresa-sverige-bangkok', emissions: 1600, id: 16 }
    }
  },
  GameEvent {
    event_id: 23,
    event_type: 'player_turn',
    payload: { socketID: 1 }
  },
  GameEvent {
    event_id: 24,
    event_type: 'card_played_from_hand',
    payload: { socketID: 0, cardID: 6, position: 8 }
  },
  GameEvent {
    event_id: 25,
    event_type: 'game_won',
    payload: { socketID: 0 }
  }
]
*/

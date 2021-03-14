import React from 'react'
import { ServerEvent, GameState } from './game/gamestate'
import { initCanvas } from './canvas/canvas'

function App() {
  const events: ServerEvent[] = [
    {
      event_id: 0,
      event_type: 'waiting_for_players',
      payload: {}
    },
    { event_id: 1, event_type: 'playing', payload: {} },
    {
      event_id: 2,
      event_type: 'draw_card',
      payload: {
        card: { name: 'bussresa-malmo-chamonix', emissions: 60, id: 7 },
        socketID: 0
      }
    }
  ]
  const state = GameState.fromEvents(events)
  window.onload = () => initCanvas(state)

  return (
    <div>
      <canvas id="klimatkoll-canvas" width="1920" height="1080" />
    </div>
  );
}

export default App;

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

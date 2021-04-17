import { BehaviorSubject } from 'rxjs'
import { GameState, ClientEvent } from '../game/gamestate'

export class DebugConsole {
  // Sets up console commands for debugging purposes
  static setupCommands(events$: BehaviorSubject<ClientEvent[]>) {
    (window as any).showGameState = () => {
      return GameState.fromEvents(events$.value)
    }

    (window as any).getGameStateGenerationTime = () => {
      const t0 = performance.now()
      const state = GameState.fromEvents(events$.value)
      const t1 = performance.now()
      return t1 - t0 
    }
  }
}

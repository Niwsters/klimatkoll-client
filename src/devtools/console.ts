import { BehaviorSubject } from 'rxjs'
import { GameState } from '../game/gamestate'
import { Event } from '../game/event'

export class DebugConsole {
  // Sets up console commands for debugging purposes
  static setupCommands(
    serverEvents$: BehaviorSubject<Event[]>,
    commands$: BehaviorSubject<Event[]>
  ) {
    (window as any).showGameState = () => {
      const events = Event
        .from([serverEvents$, commands$])
        .get()
      return GameState.fromEvents(events)
    }

    (window as any).getGameStateGenerationTime = () => {
      const events = Event
        .from([serverEvents$, commands$])
        .get()
      const t0 = performance.now()
      GameState.fromEvents(events)
      const t1 = performance.now()
      return t1 - t0 
    }
  }
}

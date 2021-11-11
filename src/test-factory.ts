import { App, AppState, AppConfig } from './App'
import { TextConfig } from './models/text-config'

export class Factory {
  static get AppState(): AppStateFactory { return new AppStateFactory() }
  static get AppConfig(): AppConfigFactory { return new AppConfigFactory() }
  static get TextConfig(): TextConfigFactory { return new TextConfigFactory() }
}

export class AppStateFactory {
  create(): AppState {
    return new AppState()
  }
}

export class AppConfigFactory {
  create(): AppConfig {
    return new AppConfig(true, "blargh", Factory.TextConfig.create())
  }
}

export class TextConfigFactory {
  create(): TextConfig {
    return {
      connectedToServer: "a",
      roomFull: "a",
      roomExists: "a",
      roomLeft: "a",
      roomJoined: "a",
      roomOpponentLeft: "a",
      reconnecting: "a",
      btnCreateGame: "a",
      btnJoinGame: "a",
      inputRoomID: "a",
      altClimateCallLogo: "a",
      waitingForPlayer: "a",
      yourTurn: "a",
      opponentsTurn: "a",
      youWon: "a",
      youLost: "a",
      labelRoom: "a",
      btnLeaveGame: "a"
    }
  }
}

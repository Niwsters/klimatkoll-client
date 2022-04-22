import { AppState } from "../app"
import { GameState } from "../game/gamestate"

export const Factory = {
  GameState: function() {
    return new GameState(this.TextConfig(), 1)
  },
  AppState: function () {
    return new AppState()
  },
  TextConfig: function () {
    return {
      connectedToServer: "string",
      roomFull: "string",
      roomExists: "string",
      roomLeft: "string",
      roomJoined: "string",
      roomOpponentLeft: "string",
      reconnecting: "string",
      btnCreateGame: "string",
      btnJoinGame: "string",
      inputRoomID: "string",
      altClimateCallLogo: "string",
      waitingForPlayer: "string",
      yourTurn: "string",
      opponentsTurn: "string",
      youWon: "string",
      youLost: "string",
      labelRoom: "string",
      btnLeaveGame: "string"
    }
  }
}


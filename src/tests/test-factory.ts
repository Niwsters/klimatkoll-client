import { AppConfig } from "../App"
import { GameState } from "../game/gamestate"

export const Factory = {
  GameState: function() {
    const text = {
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
    const config = new AppConfig(true, "blargh", text)
    return new GameState(config)
  }
}

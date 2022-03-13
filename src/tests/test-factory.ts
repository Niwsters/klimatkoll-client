import { AppConfig, AppState } from "../App"
import { GameState } from "../game/gamestate"
import { Event } from '../event/event'

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
  },
  event: {
    draw_card: (cardID: number, cardName: string, socketID: number) => {
      return new Event(0, "draw_card", { card: { id: cardID, name: cardName }, socketID })
    }
  },
  AppState: function () {
    return new AppState()
  }
}


import React from 'react'
import { TextConfig } from '../models/text-config'
import { AppConfig } from '../App'
import { GameState } from '../game/gamestate'
import { EventToAdd, LeaveGameEvent } from '../event/event'

export function StatusBar(props: {
  config: AppConfig,
  gamestate: GameState,
  addEvent: (e: EventToAdd) => void
}) {
  const state = props.gamestate
  const statusMessage: string = state.statusMessage
  const roomID = state.roomID
  const text = props.config.text
  const addEvent = props.addEvent

  return (
    <div id="status-bar">
      <div className="room-id">{ text.labelRoom } { roomID }</div>
      <div className="status-bar-message">
        { statusMessage }
      </div>
      <button className="pink" onClick={() => addEvent(new LeaveGameEvent())}>{ text.btnLeaveGame }</button>
    </div>
  )
}

import React from 'react'
import { TextConfig } from '../game/text'

export function StatusBar(props: {
  status: string,
  roomID: string | undefined,
  leaveGame: () => void,
  text: TextConfig
}) {
  const statusMessage: string = props.status
  const leaveGame = props.leaveGame
  const roomID = props.roomID
  const text = props.text

  return (
    <div id="status-bar">
      <div className="room-id">{ text.labelRoom } { roomID }</div>
      <div className="status-bar-message">
        { statusMessage }
      </div>
      <button className="pink" onClick={() => leaveGame()}>{ text.btnLeaveGame }</button>
    </div>
  )
}

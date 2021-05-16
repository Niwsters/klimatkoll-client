import React from 'react'

export function StatusBar(props: {
  status: string,
  roomID: string | undefined,
  leaveGame: () => void
}) {
  const statusMessage: string = props.status
  const leaveGame = props.leaveGame
  const roomID = props.roomID

  return (
    <div id="status-bar">
      <div className="room-id">Rum: { roomID }</div>
      <div className="status-bar-message">
        { statusMessage }
      </div>
      <button className="pink" onClick={() => leaveGame()}>Lämna spel</button>
    </div>
  )
}

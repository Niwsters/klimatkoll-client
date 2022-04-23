import React from 'react'
import { TextConfig } from '@shared/models'

export function RoomID(text: TextConfig, roomID: string): React.ReactElement {
  const style: any = {
    "font-size": "1em"
  }

  return <div className="room-id" style={style}>{ text.labelRoom } { roomID }</div>
}

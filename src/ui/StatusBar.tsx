import React from 'react'
import { AppConfig } from '../App'
import { GameState } from '../game/gamestate'
import { EventToAdd, LeaveGameEvent } from '../event/event'
import { TextConfig } from '../models/text-config'
import { PinkButton } from './Button'

function RoomID(text: TextConfig, roomID: string) {
  const style: any = {
    "padding-left": "4.17vw",
    "padding-top": "2.1vw",
    "font-size": "2.1vw"
  }

  return <div className="room-id" style={style}>{ text.labelRoom } { roomID }</div>
}

function LeaveGameBtn(text: TextConfig, addEvent: (event: EventToAdd) => void) {
  function onClick() {
    addEvent(new LeaveGameEvent())
  }

  return PinkButton(text.btnLeaveGame, onClick)
}

function StatusMessage(message: string) {
  const style: any = {
    "font-size": "3.33vw",
    'padding-left': '4.17vw',
    'padding-right': '2.4vw'
  }

  return <div style={style}>{ message }</div>
}

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

  const style = {
    "display": "flex",
    "justify-content": "space-between",
    "flex-direction": "column",
    "box-sizing": "border-box",
    "width": "24vw",
    "height": "56.25vw",
    "background": "#F3EFEC",
    "margin-top": "-56.25vw",
    "color": "#444"
  }

  return (
    <div id="status-bar" style={style}>
      { RoomID(text, roomID) }
      { StatusMessage(statusMessage) }
      { LeaveGameBtn(text, addEvent) }
    </div>
  )
}

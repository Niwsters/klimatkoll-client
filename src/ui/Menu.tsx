import React, { Component } from 'react'
import { TextConfig } from '../models/text-config'
import { AppConfig } from '../App'
import { EventToAdd, CreateGameEvent, JoinGameEvent } from '../event/event'

interface Props {
  addEvent: (event: EventToAdd) => void
  config: AppConfig
}

export function Menu(props: Props) {
  const config = props.config
  const addEvent = props.addEvent
  const text = config.text
  const httpServerURL = config.httpServerURL

  const getRoomID = () => {
    const roomIDInput = document.getElementById('roomID') as HTMLInputElement
    if (!roomIDInput) throw new Error("Can't get roomID input")
    return roomIDInput.value
  }

  return (
    <div className="menu">
      <img className="logo" src={httpServerURL + "/logo.webp"} alt={text.altClimateCallLogo} />
      <input id="roomID" type="text" placeholder={text.inputRoomID} />
      <button onClick={() => addEvent(new CreateGameEvent(getRoomID()))} className="pink">
        {text.btnCreateGame}
      </button>
      <button onClick={() => addEvent(new JoinGameEvent(getRoomID()))} className="yellow">
        {text.btnJoinGame}
      </button>
    </div>
  )
}

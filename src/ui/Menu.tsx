import React from 'react'
import { TextConfig } from '../models/text-config'
import { AppConfig } from '../config'

interface Props {
  createGame: (roomID: string) => void,
  joinGame: (roomID: string) => void,
  config: AppConfig
}

export function Menu(props: Props) {
  const config = props.config
  const text = config.text
  const httpServerURL = config.httpServerURL

  const getRoomID = () => {
    const roomIDInput = document.getElementById('roomID') as HTMLInputElement
    if (!roomIDInput) throw new Error("Can't get roomID input")
    return roomIDInput.value
  }

  const createGame = () => {
    const roomID = getRoomID()
    props.createGame(roomID)
  }
  const joinGame = () => {
    const roomID = getRoomID()
    props.joinGame(roomID)
  }

  return (
    <div className="menu">
      <img className="logo" src={httpServerURL + "/logo.webp"} alt={text.altClimateCallLogo} />
      <input id="roomID" type="text" placeholder={text.inputRoomID} />
      <button onClick={() => createGame()} className="pink">
        {text.btnCreateGame}
      </button>
      <button onClick={() => joinGame()} className="yellow">
        {text.btnJoinGame}
      </button>
    </div>
  )
}

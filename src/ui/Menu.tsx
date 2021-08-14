import React from 'react'

interface Props {
  createGame: (roomID: string) => void,
  joinGame: (roomID: string) => void,
  serverUrl: string
}

export function Menu(props: Props) {

  const serverUrl = props.serverUrl
  if (!serverUrl) return (<div>Loading...</div>);

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
      <img className="logo" src={serverUrl + "/logo.webp"} alt="Klimatkoll logga" />
      <input id="roomID" type="text" placeholder="Spelets namn" />
      <button onClick={() => createGame()} className="pink">
        Skapa spel
      </button>
      <button onClick={() => joinGame()} className="yellow">
        Gå med i spel
      </button>
    </div>
  )
}

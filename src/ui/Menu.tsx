import React from 'react'
import { TextConfig } from '../models/text-config'
import { AppConfig } from '../App'
import { EventToAdd, CreateGameEvent, JoinGameEvent } from '../event/event'
import { PinkButton, YellowButton } from './Button'

function Logo(serverUrl: string, text: TextConfig) {
  const style: any = {
    "display": "block",
    "width": "31.25vw",
    'margin': 'auto',
    'padding-bottom': '3.125vw',
  }

  return <img src={serverUrl + "/logo.webp"} alt={text.altClimateCallLogo} style={style} />
}

function RoomIDInput(text: TextConfig, onChange: (roomID: string) => void) {
  const style: any = {
    'display': 'block',
    'margin': '0 auto',
    'border': 'none',
    'border-radius': 0,
    'padding': '0.52vw 1.04vw',
    'width': '27.1vw',
    'box-sizing': 'border-box',
    'margin-top': '1.04vw',
    'font-family': "'Poppins', sans-serif",
    'font-size': '2.1vw',
  }

  function roomIDChanged(event: any) {
    onChange(event.target.value)
  }

  return <input type="text" placeholder={text.inputRoomID} onChange={roomIDChanged} style={style} />
}

function CreateGameBtn(text: TextConfig, addEvent: (event: EventToAdd) => void, roomID: string) {
  function onClick() {
    addEvent(new CreateGameEvent(roomID))
  }

  return PinkButton(text.btnCreateGame, onClick)
}

function JoinGameBtn(text: TextConfig, addEvent: (event: EventToAdd) => void, roomID: string) {
  function onClick() {
    addEvent(new JoinGameEvent(roomID))
  }

  return YellowButton(text.btnJoinGame, onClick)
}

interface Props {
  addEvent: (event: EventToAdd) => void
  config: AppConfig
}

interface State {
  roomID: string
}

export class Menu extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { roomID: "" }
  }

  private setRoomID(roomID: string) {
    this.setState({ roomID })
  }

  render() {
    const props = this.props
    const config = props.config
    const addEvent = props.addEvent
    const text = config.text
    const httpServerURL = config.httpServerURL
    const roomID = this.state.roomID
    const setRoomID = this.setRoomID.bind(this)

    const style = {
      'background': '#181543',
      'width': '100vw',
      'height': '100%',
      'padding-top': '10.4vw',
      'box-sizing': 'border-box',
    }

    return (
      <div style={style}>
        { Logo(httpServerURL, text) }
        { RoomIDInput(text, setRoomID) }
        { CreateGameBtn(text, addEvent, roomID) }
        { JoinGameBtn(text, addEvent, roomID) }
      </div>
    )
  }
}

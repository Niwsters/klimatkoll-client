import React, { ReactElement } from 'react'
import { TextConfig } from '../models/text-config'
import { AppConfig } from '../App'
import { EventToAdd, CreateGameEvent, JoinGameEvent } from '../event/event'
import { PinkButton, YellowButton } from './Button'
import { TextInput } from './TextInput'

type AddEventFunc = (event: EventToAdd) => void

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
  return TextInput(text.inputRoomID, onChange)
}

function CreateGameBtn(text: TextConfig, addEvent: AddEventFunc, roomID: string) {
  function onClick() {
    addEvent(new CreateGameEvent(roomID))
  }

  return PinkButton(text.btnCreateGame, onClick)
}

function JoinGameBtn(text: TextConfig, addEvent: AddEventFunc, roomID: string) {
  function onClick() {
    addEvent(new JoinGameEvent(roomID))
  }

  return YellowButton(text.btnJoinGame, onClick)
}

function ButtonLayout(
  elements: ReactElement[]
) {
  const style: any = {
    'width': '27.1vw',
    'margin': '0 auto',
    'font-family': "'Poppins', sans-serif",
  }

  return <div style={style}>
    { elements }
  </div>
}

interface Props {
  addEvent: AddEventFunc
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
        {
          ButtonLayout([
            RoomIDInput(text, setRoomID),
            CreateGameBtn(text, addEvent, roomID),
            JoinGameBtn(text, addEvent, roomID)
          ])
        }
      </div>
    )
  }
}

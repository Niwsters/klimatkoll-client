import React from 'react'
import { TextConfig } from '../models/text-config'
import { AppConfig } from '../App'
import { EventToAdd, CreateGameEvent, JoinGameEvent } from '../event/event'
import { PinkButton, YellowButton } from './Button'
import { TextInput } from './TextInput'
import { ButtonLayout } from './ButtonLayout'

type AddEventFunc = (event: EventToAdd) => void

function Logo(serverUrl: string, text: TextConfig, appWidth: number) {
  const style: any = {
    "display": "block",
    "width": 0.3125 * appWidth,
    'margin': 'auto',
    'padding-bottom': 0.03125 * appWidth,
  }

  return <img src={serverUrl + "/logo.webp"} alt={text.altClimateCallLogo} style={style} />
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

interface Props {
  addEvent: AddEventFunc
  config: AppConfig
  width: number
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
    const { config, addEvent, width } = this.props
    const text = config.text
    const httpServerURL = config.httpServerURL
    const roomID = this.state.roomID
    const setRoomID = this.setRoomID.bind(this)

    const style = {
      'background': '#181543',
      'width': width + 'px',
      'height': '100%',
      'padding-top': 0.104 * width + 'px',
      'box-sizing': 'border-box',
    }

    return (
      <div style={style}>
        { Logo(httpServerURL, text, width) }
        <ButtonLayout appWidth={width}>
          { TextInput(text.inputRoomID, setRoomID, width) }
          { CreateGameBtn(text, addEvent, roomID) }
          { JoinGameBtn(text, addEvent, roomID) }
        </ButtonLayout>
      </div>
    )
  }
}

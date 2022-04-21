import React from 'react'
import { AppConfig } from '../../../root/app-config'
import { EventToAdd } from '../../../event/event'
import { TextInput } from './TextInput'
import { ButtonLayout } from './ButtonLayout'
import { Logo } from './Logo'
import { CreateGameBtn } from './CreateGameBtn'
import { JoinGameBtn } from './JoinGameBtn'
import { TextConfig } from '../../../models/text-config'

type AddEventFunc = (event: EventToAdd) => void

interface Props {
  addEvent: AddEventFunc
  config: AppConfig
  text: TextConfig
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
    const { config, addEvent, width, text } = this.props
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

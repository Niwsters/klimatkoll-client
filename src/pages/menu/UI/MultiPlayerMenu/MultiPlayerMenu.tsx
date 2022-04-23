import React from 'react'
import { TextInput } from './TextInput'
import { ButtonLayout } from '../ButtonLayout'
import { CreateGameBtn } from './CreateGameBtn'
import { JoinGameBtn } from './JoinGameBtn'
import { TextConfig } from '@shared/models'
import { AddEventFunc } from '../add-event'
import { SetRoute } from '../set-route'
import { GoBackBtn } from './GoBackBtn'

interface Props {
  addEvent: AddEventFunc
  httpServerURL: string
  text: TextConfig
  appWidth: number
  setRoute: SetRoute
}

interface State {
  roomID: string
}

export class MultiPlayerMenu extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { roomID: "" }
  }

  private setRoomID(roomID: string) {
    this.setState({ roomID })
  }

  render() {
    const { addEvent, text, appWidth, setRoute } = this.props
    const { roomID } = this.state
    const setRoomID = this.setRoomID.bind(this)

    return (
      <div>
        <ButtonLayout appWidth={appWidth}>
          { TextInput(text.inputRoomID, setRoomID, appWidth) }
          { CreateGameBtn(text, addEvent, roomID) }
          { JoinGameBtn(text, addEvent, roomID) }
          <GoBackBtn
            text={text}
            setRoute={setRoute}
            />
        </ButtonLayout>
      </div>
    )
  }
}

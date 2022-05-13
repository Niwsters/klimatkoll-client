import React from 'react'
import { TextInput } from './TextInput'
import { ButtonLayout } from '../ButtonLayout'
import { TextConfig } from '@shared/models'
import { SetRoute } from '../set-route'
import { Button } from '@shared/components'
import { createGameEvent, EventToAdd, joinGameEvent } from '@shared/events'
import { Inbox } from 'inbox'

interface Props {
  httpServerURL: string
  text: TextConfig
  appWidth: number
  setRoute: SetRoute
  mpServer: Inbox<EventToAdd>
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

  private createGame() {
    this.props.mpServer.send(createGameEvent(this.state.roomID))
  }

  private joinGame() {
    this.props.mpServer.send(joinGameEvent(this.state.roomID))
  }

  render() {
    const { text, appWidth, setRoute } = this.props
    const setRoomID = this.setRoomID.bind(this)

    return (
      <div>
        <ButtonLayout appWidth={appWidth}>
          { TextInput(text.inputRoomID, setRoomID, appWidth) }
          <Button
            label={text.btnCreateGame}
            onClick={() => this.createGame()}
            color="pink"
          />
          <Button
            label={text.btnJoinGame}
            onClick={() => this.joinGame()}
            color="yellow"
          />
          <Button
            label={"Tillbaka"}
            onClick={() => setRoute("/")}
            color="pink"
          />
        </ButtonLayout>
      </div>
    )
  }
}

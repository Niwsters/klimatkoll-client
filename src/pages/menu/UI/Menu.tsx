import React from 'react'
import { EventToAdd } from '../../../event/event'
import { TextInput } from './TextInput'
import { ButtonLayout } from './ButtonLayout'
import { Logo } from './Logo'
import { CreateGameBtn } from './CreateGameBtn'
import { JoinGameBtn } from './JoinGameBtn'
import { TextConfig } from '@shared/models'
import { Stream } from '../../../stream'
import { Resolution } from '../../../root'

type AddEventFunc = (event: EventToAdd) => void

interface Props {
  addEvent: AddEventFunc
  httpServerURL: string
  text: TextConfig
  resolution$: Stream<Resolution>
}

interface State {
  roomID: string
  resolution: Resolution
}

export class Menu extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { roomID: "", resolution: { width: 0, height: 0 } }
  }

  componentDidMount() {
    this.props.resolution$.subscribe(resolution => this.setState({ resolution }))
  }

  private setRoomID(roomID: string) {
    this.setState({ roomID })
  }

  render() {
    const { addEvent, text, httpServerURL } = this.props
    const { roomID, resolution } = this.state
    const { width, height } = resolution
    const setRoomID = this.setRoomID.bind(this)

    const style = {
      'background': '#181543',
      'width': width + 'px',
      'height': height + 'px',
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

import React from 'react'
import { GameState } from '../../../game/gamestate'
import { EventToAdd } from '../../../event/event'
import { RoomID } from './RoomID'
import { LeaveGameBtn } from './LeaveGameBtn'
import { StatusMessage } from './StatusMessage'
import { Layout } from './Layout'
import { TextConfig } from '../../../models/text-config'
import { Resolution } from '../../../root'
import { Stream } from '../../../stream'

type Props = {
  text: TextConfig,
  gamestate: GameState,
  addEvent: (e: EventToAdd) => void,
  resolution$: Stream<Resolution>
}

type State = {
  resolution: Resolution
}

export class StatusBar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { resolution: { width: 0, height: 0 } }
  }

  componentDidMount() {
    this.props.resolution$.subscribe(resolution => this.setState({ resolution }))
  }

  render() {
    const { gamestate, addEvent, text } = this.props
    const { resolution } = this.state
    const { width } = resolution
    const statusMessage: string = gamestate.statusMessage
    const roomID = gamestate.roomID

    const style = {
      "box-sizing": "border-box",
      "width": 0.24 * width,
      "height": 0.5625 * width,
      "background": "#F3EFEC",
      "padding-top": 0.021 * width,
      "color": "#444"
    }

    return (
      <div id="status-bar" style={style}>
        <Layout bottomButton={LeaveGameBtn(text, addEvent)} appWidth={width}>
          { RoomID(text, roomID) }
          { StatusMessage(statusMessage, width) }
        </Layout>
      </div>
    )
  }
}

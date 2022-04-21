import React from 'react'
import { GameState } from '../../../game/gamestate'
import { EventToAdd } from '../../../event/event'
import { RoomID } from './RoomID'
import { LeaveGameBtn } from './LeaveGameBtn'
import { StatusMessage } from './StatusMessage'
import { Layout } from './Layout'
import { TextConfig } from '../../../models/text-config'

export function StatusBar(props: {
  text: TextConfig,
  gamestate: GameState,
  addEvent: (e: EventToAdd) => void,
  appWidth: number
}): React.ReactElement {
  const { gamestate, addEvent, appWidth, text } = props
  const statusMessage: string = gamestate.statusMessage
  const roomID = gamestate.roomID

  const style = {
    "box-sizing": "border-box",
    "width": 0.24 * appWidth,
    "height": 0.5625 * appWidth,
    "background": "#F3EFEC",
    "padding-top": 0.021 * appWidth,
    "color": "#444"
  }

  return (
    <div id="status-bar" style={style}>
      <Layout bottomButton={LeaveGameBtn(text, addEvent)} appWidth={appWidth}>
        { RoomID(text, roomID) }
        { StatusMessage(statusMessage, appWidth) }
      </Layout>
    </div>
  )
}

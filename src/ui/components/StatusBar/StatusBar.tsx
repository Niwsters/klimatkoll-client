import React from 'react'
import { AppConfig } from '../../../app-config'
import { GameState } from '../../../game/gamestate'
import { EventToAdd } from '../../../event/event'
import { RoomID } from './RoomID'
import { LeaveGameBtn } from './LeaveGameBtn'
import { StatusMessage } from './StatusMessage'
import { Layout } from './Layout'

export function StatusBar(props: {
  config: AppConfig,
  gamestate: GameState,
  addEvent: (e: EventToAdd) => void,
  appWidth: number
}): React.ReactElement {
  const { gamestate, config, addEvent, appWidth } = props
  const statusMessage: string = gamestate.statusMessage
  const roomID = gamestate.roomID
  const text = config.text

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

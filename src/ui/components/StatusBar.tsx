import React from 'react'
import { AppConfig } from '../../app-config'
import { GameState } from '../../game/gamestate'
import { EventToAdd, LeaveGameEvent } from '../../event/event'
import { TextConfig } from '../../models/text-config'
import { PinkButton } from './Button'

function RoomID(text: TextConfig, roomID: string) {
  const style: any = {
    "font-size": "1em"
  }

  return <div className="room-id" style={style}>{ text.labelRoom } { roomID }</div>
}

function LeaveGameBtn(text: TextConfig, addEvent: (event: EventToAdd) => void) {
  function onClick() {
    addEvent(new LeaveGameEvent())
  }

  return PinkButton(text.btnLeaveGame, onClick)
}

function StatusMessage(message: string, appWidth: number) {
  const style: any = {
    "font-size": "1.5873em",
    'padding-right': 0.024 * appWidth
  }

  return <div style={style}>{ message }</div>
}

function StatusElement(props: { children: React.ReactElement, appWidth: number }) {
  const style: any = {
    'padding-left': 0.0417 * props.appWidth
  }

  return <div style={style}>{props.children}</div>
}

function Layout(props: { children: React.ReactElement[], bottomButton: React.ReactElement, appWidth: number }) {
  let { children, bottomButton, appWidth} = props
  children = children.map(elem => <StatusElement appWidth={appWidth}>{elem}</StatusElement>)

  const style: any = {
    "display": "flex",
    "justify-content": "space-between",
    "flex-direction": "column",
    "height": "100%"
  }

  return <div style={style}>
    {children}
    {bottomButton}
  </div>
}

export function StatusBar(props: {
  config: AppConfig,
  gamestate: GameState,
  addEvent: (e: EventToAdd) => void,
  appWidth: number
}) {
  const { gamestate, config, addEvent, appWidth } = props
  const statusMessage: string = gamestate.statusMessage
  const roomID = gamestate.roomID
  const text = config.text

  const style = {
    "box-sizing": "border-box",
    "width": 0.24 * appWidth,
    "height": 0.5625 * appWidth,
    "background": "#F3EFEC",
    "margin-top": -0.5625 * appWidth,
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

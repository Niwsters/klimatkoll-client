import React from 'react'
import { TextConfig } from '@shared/models'

type Props = {
  httpServerURL: string
  text: TextConfig
  appWidth: number
}

export function Logo(props: Props): React.ReactElement {
  const { appWidth, httpServerURL, text } = props

  const style: any = {
    "display": "block",
    "width": 0.3125 * appWidth,
    'margin': 'auto',
    'padding-bottom': 0.03125 * appWidth,
  }

  return <img src={httpServerURL + "/logo.webp"} alt={text.altClimateCallLogo} style={style} />
}

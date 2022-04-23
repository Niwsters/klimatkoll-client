import React from 'react'
import { TextConfig } from '../../../models/text-config'

export function Logo(
  serverUrl: string,
  text: TextConfig,
  appWidth: number
): React.ReactElement {
  const style: any = {
    "display": "block",
    "width": 0.3125 * appWidth,
    'margin': 'auto',
    'padding-bottom': 0.03125 * appWidth,
  }

  return <img src={serverUrl + "/logo.webp"} alt={text.altClimateCallLogo} style={style} />
}

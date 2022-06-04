import { SPState } from "../sp-state"
import { Style } from "./style"
import React from 'react'

type Props = {
  spState: SPState
}

function cardsLeft(spState: SPState): number {
  return spState.deck.length + spState.hand.length
}

function correctCards(spState: SPState): number {
  return spState.emissionsLine.length - 1
}

export function StatusInfo(props: Props): React.ReactElement {
  const style: Style = {
    "flex-grow": "1",
    "padding": "1em"
  }

  return (
    <div style={style}>
      <div>
        Cards left: { cardsLeft(props.spState) }
      </div>
      <br />
      <div>
        Correct placements: { correctCards(props.spState) }
      </div>
    </div>
  )
}
